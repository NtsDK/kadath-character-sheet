import { observer } from "mobx-react-lite";
import { Layout } from "antd";

import { getGameEditorUiStore } from "../IoC";

export const DataModelEditor = observer(() => {
  const gameEditorUiStore = getGameEditorUiStore();
  return (
    <div>
      DataModelEditor
      <pre>{JSON.stringify(gameEditorUiStore.game.dataModel, null, "  ")}</pre>
    </div>
  );
});
