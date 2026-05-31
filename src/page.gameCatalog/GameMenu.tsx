import { observer } from "mobx-react-lite";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toJS } from "mobx";

import { assert } from "../utils/assert";
import { getConfirmModalUiStore, getExportManager, getGameStore } from "../IoC";
import type { Game } from "../domain/Game";
import { includes } from "../utils/includes";

import { RenameGameModal } from "./RenameGameModal";

const GAME_MENU_KEYS = ["rename", "copy", "delete", "export"] as const;

type GameMenuKey = (typeof GAME_MENU_KEYS)[number];

const items: MenuProps["items"] = [
  {
    label: "Переименовать",
    key: "rename" satisfies GameMenuKey,
  },
  {
    label: "Скопировать",
    key: "copy" satisfies GameMenuKey,
  },
  // {
  //   label: "Скачать",
  //   key: "export" satisfies CharSheetMenuKey,
  // },
  {
    type: "divider",
  },
  {
    label: "Удалить",
    key: "delete" satisfies GameMenuKey,
  },
];

type Props = {
  game: Game;
};

export const GameMenu = observer(({ game }: Props) => {
  const gameStore = getGameStore();
  // const exportManager = getExportManager();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameCharId, setRenameCharId] = useState(uuid());

  const { id, name } = game;

  const makeOnClick =
    (): MenuProps["onClick"] =>
    ({ key }) => {
      assert(includes(key, ...GAME_MENU_KEYS));
      // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "rename") {
        setRenameCharId(id);
        setIsRenameModalOpen(true);
      } else if (key === "copy") {
        gameStore.copy(id);
      } else if (key === "delete") {
        getConfirmModalUiStore().confirm(
          `Вы уверены, что хотите удалить игру ${name}?`,
          () => {
            gameStore.delete(id);
          },
        );
        // } else if (key === "export") {
        //   const charSheet = charSheetStore.get(id);
        //   assert(charSheet);
        //   exportManager.export(toJS([charSheet]));
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
      <RenameGameModal
        key={renameCharId}
        title="Переименовать игру"
        isModalOpen={isRenameModalOpen}
        handleOk={(name) => {
          gameStore.updateMeta(renameCharId, { name });
          setIsRenameModalOpen(false);
        }}
        defaultNameValue={gameStore.get(renameCharId)?.name}
        defaultIdValue={gameStore.get(renameCharId)?.id}
        handleCancel={() => setIsRenameModalOpen(false)}
      />
    </>
  );
});
