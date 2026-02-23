import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { RenameCharSheetModal } from "./RenameCharSheetModal";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CatalogTable } from "./CatalogTable";
import { getCharSheetStore } from "../IoC";
import { MainMenu } from "./MainMenu";

export const CatalogPage = observer(() => {
  const charSheetStore = getCharSheetStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createKey, setCreateKey] = useState(uuid());

  return (
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
        <MainMenu />
      </div>
      <CatalogTable />
      <RenameCharSheetModal
        key={createKey}
        title="Создать персонажа"
        isModalOpen={isCreateModalOpen}
        handleOk={(name) => {
          charSheetStore.create(name);
          setIsCreateModalOpen(false);
        }}
        handleCancel={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
});
