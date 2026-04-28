import { Button, Table, Tag } from "antd";
import { observer } from "mobx-react-lite";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";

import type { CharSheet } from "../domain/CharSheet";
import {
  getConfirmModalUiStore,
  getExportManager,
  getGameCatalogPageUiStore,
  getGameStore,
} from "../IoC";
import { simpleDateFormat } from "../utils/simpleDateFormat";
import type { Game, GameContent } from "../domain/Game";

import { GameMenu } from "./GameMenu";
import { GameLink } from "./GameLink";

const columns: ColumnsType<Game> = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => <GameLink game={record} />,
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      const gameStore = getGameStore();
      if (gameStore.hasDraft(record.id)) {
        return <Tag color="yellow">Есть черновик</Tag>;
      }
      return <Tag color="green">Опубликована</Tag>;
    },
  },
  // {
  //   title: "Обновлено",
  //   dataIndex: "updatedAt",
  //   key: "updatedAt",
  //   sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
  //   render: simpleDateFormat,
  // },
  {
    title: "",
    dataIndex: "menu",
    key: "menu",
    render: (_, record) => <GameMenu game={record} />,
  },
];

export const CatalogTable = observer(() => {
  const { games } = getGameCatalogPageUiStore();
  const gameStore = getGameStore();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<Game>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: Game) => ({
      name: record.id,
    }),
  };

  if (games.length === 0) {
    return (
      <div>
        <div className="tw-text-xl tw-m-10">
          В базе нет игр. Создайте игру с помощью кнопки наверху страницы.
        </div>
      </div>
    );
  }

  return (
    <>
      <Table<Game>
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={games}
        size="small"
        rowKey={(el) => el.id}
        pagination={false}
      />
      {/* {selectedRowKeys.length > 0 && (
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
      )} */}
    </>
  );
});
