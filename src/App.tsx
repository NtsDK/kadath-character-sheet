import { observer } from "mobx-react-lite";
import { CharSheetEditor } from "./components/CharSheetEditor";

export const App = observer(() => {
  return (
    <div>
      <div>Hello, Kadath!</div>
      <CharSheetEditor />
    </div>
  );
});
