import { Button, Col, Row, Table } from "antd";
import { observer } from "mobx-react-lite";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";

import type {
  LabeledNumberInRangeItem,
  NumberItem,
  PrimitiveItem,
  StringItem,
  TopDataModelItem,
} from "../../domain/GameDataModel";
import { getGameEditorUiStore } from "../../IoC";

import { DataModelItemMenu } from "./DataModelItemMenu";
import { StringPrimitiveEditor } from "./StringPrimitiveEditor";
import { NumberPrimitiveEditor } from "./NumberPrimitiveEditor";
import { LabeledNumberInRangePrimitiveEditor } from "./LabeledNumberInRangePrimitiveEditor";
import { ListEditor } from "./ListEditor";
import { PrimitiveEditor } from "./PrimitiveEditor";

const columns: ColumnsType<TopDataModelItem> = [
  {
    title: "",
    dataIndex: "body",
    key: "body",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortOrder: "ascend",
    render: (_, record) => {
      const uiStore = getGameEditorUiStore();
      return (
        <div className="tw-mb-4">
          <Row className="tw-mb-2">
            <Col span={9} className="tw-font-semibold">
              {record.name}
            </Col>
            <Col span={12}>{record.id}</Col>
          </Row>
          {/* <br />
          {record.type} {record.type == "list" && record.proto.type}
          <br /> */}
          {record.type !== "list" && (
            <PrimitiveEditor
              item={record}
              onChange={function (modelItem: Partial<PrimitiveItem>): void {
                uiStore.editModelItemProps(record.id, modelItem);
              }}
            />
          )}
          {record.type === "list" && (
            <ListEditor id={record.id} item={record} />
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
