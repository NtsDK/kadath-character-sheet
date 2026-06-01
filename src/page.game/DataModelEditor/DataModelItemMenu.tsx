import { observer } from "mobx-react-lite";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toJS } from "mobx";

import { assert } from "../../utils/assert";
import {
  getCharSheetStore,
  getConfirmModalUiStore,
  getExportManager,
  getGameEditorUiStore,
} from "../../IoC";
import type { TopDataModelItem } from "../../domain/GameDataModel";
import { includes } from "../../utils/includes";

import { EditModelItemModal } from "./EditModelItemModal";

const MODEL_ITEM_MENU_KEYS = ["edit", "copy", "delete"] as const;

type ModelItemMenuKey = (typeof MODEL_ITEM_MENU_KEYS)[number];

const items: MenuProps["items"] = [
  {
    label: "Изменить",
    key: "edit" satisfies ModelItemMenuKey,
  },
  {
    label: "Скопировать",
    key: "copy" satisfies ModelItemMenuKey,
  },
  {
    type: "divider",
  },
  {
    label: "Удалить",
    key: "delete" satisfies ModelItemMenuKey,
  },
];

type Props = {
  modelItem: TopDataModelItem;
};

export const DataModelItemMenu = observer(({ modelItem }: Props) => {
  const gameEditorUiStore = getGameEditorUiStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItemModelName, setEditItemModelName] = useState(uuid());

  const { title, name, type } = modelItem;

  const makeOnClick =
    (): MenuProps["onClick"] =>
    ({ key }) => {
      assert(includes(key, ...MODEL_ITEM_MENU_KEYS));
      // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "edit") {
        setEditItemModelName(name);
        // setEditItemModelName(uuid());
        setIsEditModalOpen(true);
      } else if (key === "copy") {
        gameEditorUiStore.copyModelItem(name);
      } else if (key === "delete") {
        getConfirmModalUiStore().confirm(
          `Вы уверены, что хотите удалить элемент модели ${title}?`,
          () => {
            gameEditorUiStore.deleteModelItem(name);
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

      <EditModelItemModal
        key={editItemModelName}
        title="Изменить элемент модели"
        isModalOpen={isEditModalOpen}
        handleOk={(name, title, typeMeta) => {
          gameEditorUiStore.editModelItem(modelItem.name, name, title, typeMeta);
          setIsEditModalOpen(false);
        }}
        defaultItemTitle={title}
        defaultName={name}
        defaultTypeMeta={
          type === "list"
            ? {
                type: "list",
                proto: modelItem.proto.type,
              }
            : { type }
        }
        handleCancel={() => setIsEditModalOpen(false)}
      />
    </>
  );
});
