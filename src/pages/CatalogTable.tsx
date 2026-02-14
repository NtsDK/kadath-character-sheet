import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { CharSheet } from "../domain/CharSheet";
import { catalogPageUiStore } from "./CatalogPageUiStore";
import { ColumnsType } from "antd/es/table";
import { CharacterMenu } from "./CharacterMenu";
import { DateTime } from "luxon";
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
    render: (value) =>
      DateTime.fromJSDate(value).toFormat("dd LLL yyyy HH:MM:ss", {
        locale: "ru",
      }),
  },
  {
    title: "",
    dataIndex: "menu",
    key: "menu",
    render: (_, record) => <CharacterMenu charSheet={record} />,
  },
];

export const CatalogTable = observer(() => {
  const { charSheets } = catalogPageUiStore;

  return <Table<CharSheet> columns={columns} dataSource={charSheets} />;
});
