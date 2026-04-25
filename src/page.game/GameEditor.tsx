import { observer } from "mobx-react-lite";
import { Col, Form, Input, Row, Segmented } from "antd";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { getGameEditorUiStore } from "../IoC";

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
    </div>
  );
});
