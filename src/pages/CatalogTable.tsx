import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { ColumnsType } from "antd/es/table";

import { CharSheet } from "../domain/CharSheet";
import { getCatalogPageUiStore } from "../IoC";
import { simpleDateFormat } from "../utils/simpleDateFormat";

import { CharacterMenu } from "./CharacterMenu";
import { CharacterLink } from "./CharacterLink";

const columns: ColumnsType<CharSheet> = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => <CharacterLink charSheet={record} />
  },
  {
    title: "Обновлено",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
    render: simpleDateFormat
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

  return <Table<CharSheet> columns={columns} dataSource={charSheets} size="small"/>;
});
