import { Button, Table } from "antd";
import { observer } from "mobx-react-lite";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";

import type { TopDataModelItem } from "../../domain/GameDataModel";
import { getGameEditorUiStore } from "../../IoC";

import { DataModelItemMenu } from "./DataModelItemMenu";
import { StringPrimitiveEditor } from "./StringPrimitiveEditor";
import { NumberPrimitiveEditor } from "./NumberPrimitiveEditor";
import { LabeledNumberInRangePrimitiveEditor } from "./LabeledNumberInRangePrimitiveEditor";

const columns: ColumnsType<TopDataModelItem> = [
  {
    title: "",
    dataIndex: "body",
    key: "body",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortOrder: "ascend",
    render: (_, record) => {
      return (
        <div>
          {record.name}
          <br />
          {record.id}
          <br />
          {record.type} {record.type == "list" && record.proto.type}
          <br />
          {record.type === "string" && (
            <StringPrimitiveEditor id={record.id} item={record} />
          )}
          {record.type === "number" && (
            <NumberPrimitiveEditor id={record.id} item={record} />
          )}
          {record.type === "labeledNumberInRange" && (
            <LabeledNumberInRangePrimitiveEditor id={record.id} item={record} />
          )}
        </div>
      );
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
    render: (_, record) => <DataModelItemMenu modelItem={record} />,
  },
];

export const CatalogTable = observer(() => {
  const { game } = getGameEditorUiStore();

  return (
    <>
      <Table<TopDataModelItem>
        columns={columns}
        dataSource={game.dataModel}
        size="small"
        rowKey={(el) => el.id}
        pagination={false}
      />
    </>
  );
});
