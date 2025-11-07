import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import {
  InfoCircleOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router";

export const NavMenu = observer(() => {
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      key={location.pathname}
    >
      <Menu.Item key="/">
        <TeamOutlined />
        <span>Каталог персонажей</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="/charSheet">
        <UserOutlined />
        <span>Лист персонажа</span>
        <Link to="/charSheet" />
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
