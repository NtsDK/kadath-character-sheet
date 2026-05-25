import { observer } from "mobx-react-lite";
import { Button, Layout } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { getGameEditorUiStore } from "../../IoC";

import { CatalogTable } from "./CatalogTable";
import { EditModelItemModal } from "./EditModelItemModal";

export const DataModelEditor = observer(() => {
  const gameEditorUiStore = getGameEditorUiStore();

  //   const charSheetStore = getCharSheetStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createKey, setCreateKey] = useState(uuid());
  return (
    // <div>
    //   DataModelEditor
    //   <pre>{JSON.stringify(gameEditorUiStore.game.dataModel, null, "  ")}</pre>
    // </div>

    <div className="tw-px-8 tw-py-4 tw-w-full">
      <div className="tw-mb-4 tw-flex tw-justify-between">
        <Button
          type="primary"
          onClick={() => {
            setIsCreateModalOpen(true);
            setCreateKey(uuid());
          }}
        >
          <PlusIcon className="tw-h-4" /> Создать
        </Button>
        {/* <MainMenu /> */}
      </div>
      <CatalogTable />
      <EditModelItemModal
        key={createKey}
        title="Создать элемент модели"
        isModalOpen={isCreateModalOpen}
        handleOk={(name, title, typeMeta) => {
          gameEditorUiStore.createModelItem(name, title, typeMeta);
          setIsCreateModalOpen(false);
        }}
        handleCancel={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
});
