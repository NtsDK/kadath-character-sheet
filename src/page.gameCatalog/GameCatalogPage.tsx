import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { getGameStore, getLibraryPageStore } from "../IoC";

import { CatalogTable } from "./CatalogTable";
import { RenameGameModal } from "./RenameGameModal";

export const GameCatalogPage = observer(() => {
    const gameStore = getGameStore();
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
          {/* <MainMenu /> */}
        </div>
        <CatalogTable />
        <RenameGameModal
          key={createKey}
          title="Создать игру"
          isModalOpen={isCreateModalOpen}
          handleOk={(name, id) => {
            gameStore.create(name, id);
            setIsCreateModalOpen(false);
          }}
          handleCancel={() => setIsCreateModalOpen(false)}
        />
        {/* <ImportModal /> */}
      </div>
    );
});
