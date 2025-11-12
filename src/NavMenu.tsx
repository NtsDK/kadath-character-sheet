import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import {
  InfoCircleOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router";
import { charSheetEditorUiStore } from "./charSheetPage/CharSheetEditorUiStore";
import { charSheetStore } from "./domainServices/CharSheetStore";

export const NavMenu = observer(() => {
  const location = useLocation();

  const key = location.pathname;
  const charId = charSheetEditorUiStore.id;

  return (
    <Menu theme="dark" defaultSelectedKeys={[key]} mode="inline" key={key}>
      <Menu.Item key="/">
        <TeamOutlined />
        <span>Каталог персонажей</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item
        key={"/charSheet/" + charId}
        disabled={!charSheetStore.exists(charId)}
      >
        <UserOutlined />
        <span>Лист персонажа</span>
        <Link to={"/charSheet/" + charId} />
      </Menu.Item>
      <Menu.Item key="/instruction">
        <QuestionCircleOutlined />
        <span>Инструкция</span>
        <Link to="/instruction" />
      </Menu.Item>
      <Menu.Item key="/about">
        <InfoCircleOutlined />
        <span>О программе</span>
        <Link to="/about" />
      </Menu.Item>
    </Menu>
  );
});
