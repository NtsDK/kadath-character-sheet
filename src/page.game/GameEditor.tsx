import { observer } from "mobx-react-lite";
import { Col, Form, Input, Row, Segmented, Tabs } from "antd";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  LayoutOutlined,
  ProfileOutlined,
  TeamOutlined
} from "@ant-design/icons";

import { getGameEditorUiStore } from "../IoC";

import { DataModelEditor } from "./DataModelEditor";
import { LayoutEditor } from "./LayoutEditor";

export const GameEditor = observer(() => {
  const gameEditorUiStore = getGameEditorUiStore();
  const params = useParams();

  useEffect(() => {
    if (params.gameId) {
      gameEditorUiStore.setId(params.gameId);
    }
  }, [params.gameId, gameEditorUiStore]);

  if (!gameEditorUiStore.gameExists) {
    return null;
  }

  return (
    <div style={{ width: "40rem" }} className="tw-px-8 tw-py-4">
      <h1 className="tw-text-2xl tw-mb-4">{gameEditorUiStore.game.name}</h1>
      <Tabs
        defaultActiveKey="dataModel"
        tabPosition="left"
        items={[
          {
            label: "Модель данных",
            key: "dataModel",
            children: <DataModelEditor />,
            icon: <ProfileOutlined />
          },
          {
            label: "Макет",
            key: "layout",
            children: <LayoutEditor />,
            icon: <LayoutOutlined />
          },
          // {
          //   label: "Прегены",
          //   key: "pregens",
          //   children: "Прегены",
          //   icon: <TeamOutlined />
          // },
          // {
          //   label: "База предметов",
          //   key: "gearItems",
          //   children: "База предметов",
          // },
        ]}
      />
    </div>
  );
});
