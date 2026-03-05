import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { toJS } from "mobx";
import Dropzone from "react-dropzone";

import { assert } from "../utils/assert";
import {
  getCharSheetStore,
  getConfirmModalUiStore,
  getExportManager,
  getImportManager,
  getNotificationModalUiStore,
} from "../IoC";

const MAIN_MENU_KEYS = [
  "drop_base",
  "export_all",
  "import",
  "open_notification_center",
] as const;

type MainMenuKey = (typeof MAIN_MENU_KEYS)[number];

type Props = { className?: string };

const items: MenuProps["items"] = [
  {
    label: "Скачать все данные",
    key: "export_all" satisfies MainMenuKey,
  },
  {
    label: (
      <Dropzone
        onDrop={async (acceptedFiles) => {
          const importManager = getImportManager();
          try {
            await importManager.import(acceptedFiles[0]);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} accept=".zip" multiple={false} />
            Загрузить данные
          </div>
        )}
      </Dropzone>
    ),

    key: "import" satisfies MainMenuKey,
  },
  {
    label: "Центр уведомлений",
    key: "open_notification_center" satisfies MainMenuKey,
  },
  {
    type: "divider",
  },
  {
    label: "Очистить базу персонажей",
    key: "drop_base" satisfies MainMenuKey,
    danger: true,
  },
];

export const MainMenu = () => {
  const charSheetStore = getCharSheetStore();
  const exportManager = getExportManager();

  const makeOnClick =
    (): MenuProps["onClick"] =>
    ({ key }) => {
      assert(MAIN_MENU_KEYS.includes(key as MainMenuKey));
      // // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "export_all") {
        const charSheets = charSheetStore.getAll();
        exportManager.export(toJS(charSheets));
      } else if (key === "drop_base") {
        getConfirmModalUiStore().confirm(
          `Вы уверены, что хотите удалить всю информацию?`,
          () => {
            charSheetStore.deleteAll();
          },
        );
      } else if (key === "open_notification_center") {
        getNotificationModalUiStore().setIsModalOpen(true);
      }
    };
  return (
    <Dropdown menu={{ items, onClick: makeOnClick() }} trigger={["click"]}>
      <Button
        type="text"
        shape="round"
        title="Главное меню"
        icon={<EllipsisVerticalIcon className="tw-h-4" />}
      ></Button>
    </Dropdown>
  );
};
