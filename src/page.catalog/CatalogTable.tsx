import { Button, Table } from "antd";
import { observer } from "mobx-react-lite";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";

import type { CharSheet } from "../domain/CharSheet";
import {
  getCatalogPageUiStore,
  getCharSheetStore,
  getConfirmModalUiStore,
  getExportManager,
} from "../IoC";
import { simpleDateFormat } from "../utils/simpleDateFormat";

import { CharacterMenu } from "./CharacterMenu";
import { CharacterLink } from "./CharacterLink";

const columns: ColumnsType<CharSheet> = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => <CharacterLink charSheet={record} />,
  },
  {
    title: "Обновлено",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
    render: simpleDateFormat,
  },
  {
    title: "",
    dataIndex: "menu",
    key: "menu",
    render: (_, record) => <CharacterMenu charSheet={record} />,
  },
];

export const CatalogTable = observer(() => {
  const { charSheets } = getCatalogPageUiStore();
  const exportManager = getExportManager();
  const charSheetStore = getCharSheetStore();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<CharSheet>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: CharSheet) => ({
      name: record.id,
    }),
  };

  if (charSheets.length === 0) {
    return (
      <div>
        <div className="tw-text-xl tw-m-10">
          В базе нет персонажей. Создайте персонажа с помощью кнопки наверху
          страницы или загрузите персонажа на вкладке Библиотека.
        </div>
      </div>
    );
  }

  return (
    <>
      <Table<CharSheet>
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={charSheets}
        size="small"
        rowKey={(el) => el.id}
      />
      {selectedRowKeys.length > 0 && (
        <div className="tw-fixed tw-bg-blue-900 tw-left-0 tw-top-0 tw-w-full tw-p-2 tw-text-right">
          <Button
            className="tw-mr-4"
            onClick={() => {
              const charSheets: CharSheet[] = [];
              for (const key of selectedRowKeys) {
                const charSheet = charSheetStore.get(key as string);
                if (charSheet) {
                  charSheets.push(charSheet);
                }
              }
              exportManager.export(charSheets);
              setSelectedRowKeys([]);
            }}
          >
            Скачать выбранное
          </Button>
          <Button
            onClick={() => {
              getConfirmModalUiStore().confirm(
                `Вы уверены, что хотите удалить выбранных персонажей?`,
                () => {
                  for (const key of selectedRowKeys) {
                    charSheetStore.delete(key as string);
                    setSelectedRowKeys([]);
                  }
                },
              );
            }}
          >
            Удалить выбранное
          </Button>
        </div>
      )}
    </>
  );
});
