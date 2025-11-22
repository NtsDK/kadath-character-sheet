import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import { CharSheetEditor } from "./CharSheetEditor";
import { CharSheetActions } from "./CharSheetActions";
const { Header, Content, Footer, Sider } = Layout;

export const CharSheetPage = observer(() => {
  return (
    <Content>
      <Layout>
        <Content>
          <CharSheetEditor />
        </Content>
        <Sider theme="light" width="250">
          <CharSheetActions />
        </Sider>
      </Layout>
    </Content>
  );
});
