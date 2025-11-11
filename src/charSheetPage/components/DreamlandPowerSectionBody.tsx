import { observer } from "mobx-react-lite";
import { PowerInput } from "../../unitComponents/PowerInput";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const DreamlandPowerSectionBody = observer(({className}: Props) => {
  const { dreamlandPowers } = charSheetEditorUiStore._content;

  return (
    <div className={className}>
      {dreamlandPowers.map((power, index) => (
        <PowerInput
          key={index}
          power={power}
          onChangeName={(name) =>
            charSheetEditorUiStore.setDreamlandPowerName(index, name)
          }
          onChangeValue={(value) =>
            charSheetEditorUiStore.setDreamlandPowerValue(index, value)
          }
          removePower={() => {
            charSheetEditorUiStore.removeDreamlandPower(index);
          }}
        />
      ))}
    </div>
  );
});
