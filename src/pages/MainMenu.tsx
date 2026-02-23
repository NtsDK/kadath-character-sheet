import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { assert } from "../utils/assert";
import { getCharSheetStore, getConfirmModalUiStore } from "../IoC";

const MAIN_MENU_KEYS = ["drop_base"] as const;

type MainMenuKey = (typeof MAIN_MENU_KEYS)[number];

type Props = { className?: string };

const items: MenuProps["items"] = [
  // {
  //   type: "divider",
  // },
  {
    label: "Очистить базу персонажей",
    key: "drop_base" satisfies MainMenuKey,
    danger: true,
  },
];

export const MainMenu = (props: Props) => {
  const charSheetStore = getCharSheetStore();

  const makeOnClick =
    (): MenuProps["onClick"] =>
    ({ key }) => {
      assert(MAIN_MENU_KEYS.includes(key as MainMenuKey));
      // // console.log(`Click on item ${key} for char sheet ${id}`);
      if (key === "drop_base") {
        getConfirmModalUiStore().confirm(
          `Вы уверены, что хотите удалить всю информацию?`,
          () => {
            charSheetStore.deleteAll();
          },
        );
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
