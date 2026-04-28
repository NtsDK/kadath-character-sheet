import { observer } from "mobx-react-lite";
import { Button, Layout } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";

import { getGameEditorUiStore } from "../../IoC";

import { CatalogTable } from "./CatalogTable";

export const DataModelEditor = observer(() => {
  const gameEditorUiStore = getGameEditorUiStore();

  //   const charSheetStore = getCharSheetStore();
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // const [createKey, setCreateKey] = useState(uuid());
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
            // setIsCreateModalOpen(true);
            // setCreateKey(uuid());
          }}
        >
          <PlusIcon className="tw-h-4" /> Создать
        </Button>
        {/* <MainMenu /> */}
      </div>
      <CatalogTable />
      {/* <RenameCharSheetModal
        key={createKey}
        title="Создать персонажа"
        isModalOpen={isCreateModalOpen}
        handleOk={(name) => {
          charSheetStore.create(name);
          setIsCreateModalOpen(false);
        }}
        handleCancel={() => setIsCreateModalOpen(false)}
      /> */}
    </div>
  );
});
