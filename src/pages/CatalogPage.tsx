import { observer } from "mobx-react-lite";
import { catalogPageUiStore } from "./CatalogPageUiStore";
import { Button, Dropdown, MenuProps } from "antd";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { RenameCharSheetModal } from "./RenameCharSheetModal";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { charSheetStore } from "../domainServices/CharSheetStore";
import { assert } from "../utils/assert";
import { confirmModalUiStore } from "../unitComponents/ConfirmModalUiStore";

const CHAR_SHEET_MENU_KEYS = ["rename", "copy", "delete"] as const;

type CharSheetMenuKey = (typeof CHAR_SHEET_MENU_KEYS)[number];

const items: MenuProps["items"] = [
  {
    label: "Переименовать",
    key: "rename" satisfies CharSheetMenuKey,
  },
  {
    label: "Скопировать",
    key: "copy" satisfies CharSheetMenuKey,
  },
  {
    type: "divider",
  },
  {
    label: "Удалить",
    key: "delete" satisfies CharSheetMenuKey,
  },
];

export const CatalogPage = observer(() => {
  const { charSheets } = catalogPageUiStore;
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createKey, setCreateKey] = useState(uuid());
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameCharId, setRenameCharId] = useState(uuid());

  const makeOnClick =
    (id: string, name: string): MenuProps["onClick"] =>
    ({ key }) => {
      assert(CHAR_SHEET_MENU_KEYS.includes(key as CharSheetMenuKey));
      // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "rename") {
        setRenameCharId(id);
        setIsRenameModalOpen(true);
      } else if (key === "copy") {
        charSheetStore.copy(id);
      } else if (key === "delete") {
        confirmModalUiStore.confirm(
          `Вы уверены, что хотите удалить персонажа ${name}?`,
          () => {
            charSheetStore.delete(id);
          }
        );
      }
    };

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
              <Dropdown
                menu={{ items, onClick: makeOnClick(el.id, el.name) }}
                trigger={["click"]}
              >
                <Button
                  type="text"
                  shape="round"
                  icon={<EllipsisVerticalIcon className="tw-h-4" />}
                ></Button>
              </Dropdown>
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
      <RenameCharSheetModal
        key={renameCharId}
        title="Переименовать персонажа"
        isModalOpen={isRenameModalOpen}
        handleOk={(name) => {
          charSheetStore.updateMeta(renameCharId, { name });
          setIsRenameModalOpen(false);
        }}
        defaultValue={charSheetStore.get(renameCharId)?.name}
        handleCancel={() => setIsRenameModalOpen(false)}
      />
    </div>
  );
});
