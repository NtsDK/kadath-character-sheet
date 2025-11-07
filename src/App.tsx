import { observer } from "mobx-react-lite";
import { Layout } from "antd";
import { useState } from "react";
import { CharSheetPage } from "./charSheetPage";

import { Routes, Route, HashRouter } from "react-router";
import { CatalogPage } from "./pages/CatalogPage";
import { AboutPage } from "./pages/AboutPage";
import { InstructionPage } from "./pages/InstructionPage";
import { NavMenu } from "./NavMenu";

const { Sider } = Layout;

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
          <NavMenu />
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
