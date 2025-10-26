import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import { CharSheetEditor } from "./CharSheetEditor";
const { Header, Content, Footer, Sider } = Layout;

export const CharSheetPage = observer(() => {
  return (
    <Content>
      <div>Hello, Kadath!</div>
      <CharSheetEditor />
    </Content>
  );
});
