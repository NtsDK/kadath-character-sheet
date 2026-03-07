import { observer } from "mobx-react-lite";
import { Button, Modal, Segmented, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SegmentedLabeledOption } from "antd/es/segmented";

import { getImportModalUiStore } from "../IoC";
import { simpleDateFormat } from "../utils/simpleDateFormat";

import type { ConflictInfo, ImportStrategy } from "./types";

const importStrategies: SegmentedLabeledOption<ImportStrategy>[] = [
  { label: "Пропустить", value: "skip" },
  { label: "Загрузить", value: "create" },
  { label: "Заменить", value: "replace" },
];

const columns: ColumnsType<ConflictInfo> = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => <div>{record.name}</div>,
  },
  {
    title: "Текущий обновлен",
    dataIndex: "updatedAt1",
    key: "updatedAt1",
    render: (_, record) => simpleDateFormat(record.existingCharSheet.updatedAt),
  },
  {
    title: "Загружаемый обновлен",
    dataIndex: "updatedAt2",
    key: "updatedAt2",
    render: (_, record) =>
      simpleDateFormat(record.importingCharSheet.updatedAt),
  },
  {
    title: "Стратегия импорта",
    dataIndex: "strategy",
    key: "strategy",
    render: (_, record, index) => (
      <ImportStrategyRadio index={index} record={record} />
    ),
  },
];

export const ImportStrategyRadio = observer(
  ({ record, index }: { record: ConflictInfo; index: number }) => (
    <Segmented<ImportStrategy>
      options={importStrategies}
      value={record.importStrategy}
      onChange={(value) => {
        const importModalUiStore = getImportModalUiStore();
        importModalUiStore.setImportStrategy(index, value);
      }}
    />
  ),
);

export const ImportModal = observer(() => {
  const importModalUiStore = getImportModalUiStore();

  return (
    <Modal
      title="Загрузка листов персонажей"
      open={importModalUiStore.isModalOpen}
      onCancel={() => importModalUiStore.setIsModalOpen(false)}
      onOk={() => importModalUiStore.importCharSheets()}
      width={800}
      cancelText="Отмена"
      okText="ОК"
    >
      <div className="tw-max-h-80 tw-overflow-auto">
        <div className="tw-mb-4 tw-text-right">
          {importStrategies.map((el) => (
            <Button
              className="tw-ml-4"
              onClick={() =>
                importModalUiStore.setImportStrategyToAll(el.value)
              }
            >
              {(el.label as string) + " всё"}
            </Button>
          ))}
        </div>
        <Table<ConflictInfo>
          columns={columns}
          dataSource={importModalUiStore.conflictInfos}
          size="small"
        />
      </div>
    </Modal>
  );
});
