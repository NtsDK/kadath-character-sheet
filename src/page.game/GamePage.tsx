import { observer } from "mobx-react-lite";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;

import { getLibraryPageStore } from "../IoC";

import { GameEditor } from "./GameEditor";

export const GamePage = observer(() => {
  return (
    <Content>
      <Layout>
        <Content>
          <GameEditor />
        </Content>
      </Layout>
    </Content>
  );
});
