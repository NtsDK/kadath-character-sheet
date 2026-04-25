import { observer } from "mobx-react-lite";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;

import { getLibraryPageStore } from "../IoC";

export const GamePage = observer(() => {
  return (
    <Content>
      <Layout>
        <Content>GamePage</Content>
        {/* <Sider theme="light" width="250">
          <CharSheetActions />
        </Sider> */}
      </Layout>
    </Content>
  );
});
