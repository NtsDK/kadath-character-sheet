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
  const [editItemModelId, setEditItemModelId] = useState(uuid());

  const { name: name, id: id, type } = modelItem;

  const makeOnClick =
    (): MenuProps["onClick"] =>
    ({ key }) => {
      assert(includes(key, ...MODEL_ITEM_MENU_KEYS));
      // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "edit") {
        setEditItemModelId(id);
        // setEditItemModelName(uuid());
        setIsEditModalOpen(true);
      } else if (key === "copy") {
        gameEditorUiStore.copyModelItem(id);
      } else if (key === "delete") {
        getConfirmModalUiStore().confirm(
          `Вы уверены, что хотите удалить элемент модели ${name}?`,
          () => {
            gameEditorUiStore.deleteModelItem(id);
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
        key={editItemModelId}
        title="Изменить элемент модели"
        isModalOpen={isEditModalOpen}
        handleOk={(id, name, typeMeta) => {
          gameEditorUiStore.editModelItem(modelItem.id, id, name, typeMeta);
          setIsEditModalOpen(false);
        }}
        defaultItemName={name}
        defaultId={id}
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
