import { observer } from "mobx-react-lite";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import Icon, {
  InfoCircleOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CharSheetPage } from "./charSheetPage";

import { BrowserRouter, Routes, Route, HashRouter, Link } from "react-router";
import { CatalogPage } from "./pages/CatalogPage";
import { AboutPage } from "./pages/AboutPage";
import { InstructionPage } from "./pages/InstructionPage";

const { Header, Content, Footer, Sider } = Layout;

export const App = observer(() => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <HashRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={220}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <TeamOutlined />
              <span>Каталог персонажей</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span>Лист персонажа</span>
              <Link to="/charSheet" />
            </Menu.Item>
            <Menu.Item key="3">
              <QuestionCircleOutlined />
              <span>Инструкция</span>
              <Link to="/instruction" />
            </Menu.Item>
            <Menu.Item key="4">
              <InfoCircleOutlined />
              <span>О программе</span>
              <Link to="/about" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="charSheet" element={<CharSheetPage />} />
          <Route path="instruction" element={<InstructionPage />} />
          <Route path="about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
});
