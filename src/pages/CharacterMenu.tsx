import { observer } from "mobx-react-lite";
import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { assert } from "../utils/assert";
import { CharSheet } from "../domain/CharSheet";
import { getCharSheetStore, getConfirmModalUiStore } from "../IoC";

import { RenameCharSheetModal } from "./RenameCharSheetModal";

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

type Props = {
  charSheet: CharSheet;
};

export const CharacterMenu = observer(({ charSheet }: Props) => {
  const charSheetStore = getCharSheetStore();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameCharId, setRenameCharId] = useState(uuid());

  const { id, name } = charSheet;

  const makeOnClick =
    (): MenuProps["onClick"] =>
    ({ key }) => {
      assert(CHAR_SHEET_MENU_KEYS.includes(key as CharSheetMenuKey));
      // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "rename") {
        setRenameCharId(id);
        setIsRenameModalOpen(true);
      } else if (key === "copy") {
        charSheetStore.copy(id);
      } else if (key === "delete") {
        getConfirmModalUiStore().confirm(
          `Вы уверены, что хотите удалить персонажа ${name}?`,
          () => {
            charSheetStore.delete(id);
          },
        );
      }
    };

  return (
    <>
      <Dropdown menu={{ items, onClick: makeOnClick() }} trigger={["click"]}>
        <Button
          type="text"
          shape="round"
          icon={<EllipsisVerticalIcon className="tw-h-4" />}
        ></Button>
      </Dropdown>
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
    </>
  );
});
