import { observer } from "mobx-react-lite";
import { PowerInput } from "../../unitComponents/PowerInput";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const PowerSectionBody = observer(({className}: Props) => {
  const { powers } = charSheetEditorUiStore._content;
  return (
    <div className={className}>
      {powers.map((power, index) => (
        <PowerInput
          key={index}
          power={power}
          onChangeName={(name) => charSheetEditorUiStore.setPowerName(index, name)}
          onChangeValue={(value) =>
            charSheetEditorUiStore.setPowerValue(index, value)
          }
          removePower={() => {
            charSheetEditorUiStore.removePower(index);
          }}
        />
      ))}
    </div>
  );
});
