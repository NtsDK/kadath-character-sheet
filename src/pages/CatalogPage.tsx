import { observer } from "mobx-react-lite";
import { catalogPageUiStore } from "./CatalogPageUiStore";
import { Button } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { RenameCharSheetModal } from "./RenameCharSheetModal";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { charSheetStore } from "../domainServices/CharSheetStore";
import { CharacterMenu } from "./CharacterMenu";

export const CatalogPage = observer(() => {
  const { charSheets } = catalogPageUiStore;
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createKey, setCreateKey] = useState(uuid());

  return (
    <div className="tw-px-8 tw-py-4 tw-w-full">
      <div className="tw-mb-4">
        <Button
          type="primary"
          onClick={() => {
            setIsCreateModalOpen(true);
            setCreateKey(uuid());
          }}
        >
          <PlusIcon className="tw-h-4" /> Создать
        </Button>
      </div>
      <div>
        {charSheets.map((el) => (
          <div
            className="tw-bg-gray-300 tw-mb-2  tw-flex tw-items-center"
            key={el.name}
          >
            <div
              className="tw-cursor-pointer tw-flex-1 tw-px-4 tw-py-2"
              onClick={() => {
                navigate("/charSheet/" + el.id);
              }}
            >
              {el.name}
            </div>
            <div>
              <CharacterMenu charSheet={el} />
            </div>
          </div>
        ))}
      </div>
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
