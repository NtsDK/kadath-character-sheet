import { observer } from "mobx-react-lite";
import { CharSheetEditor } from "./components/CharSheetEditor";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import {
  InfoCircleOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,

  };
}

const items: MenuItem[] = [
  getItem("Каталог персонажей", "1", <TeamOutlined />),
  getItem("Лист персонажа", "2", <UserOutlined />),
  getItem("Инструкция", "3", <QuestionCircleOutlined />),
  getItem("О программе", "4", <InfoCircleOutlined />),
];

export const App = observer(() => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={220}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Content>
        <div>Hello, Kadath!</div>
        <CharSheetEditor />
      </Content>
    </Layout>
  );
});
