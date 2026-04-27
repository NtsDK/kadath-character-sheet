import { observer } from "mobx-react-lite";
import { Layout } from "antd";

import { getGameEditorUiStore } from "../IoC";

export const LayoutEditor = observer(() => {
  const gameEditorUiStore = getGameEditorUiStore();
  return (
    <div>
      LayoutEditor
      <pre>{JSON.stringify(gameEditorUiStore.game.layout, null, "  ")}</pre>
    </div>
  );
});
