import { observer } from "mobx-react-lite";

import { PowerInput } from "../../unitComponents/PowerInput";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const DreamlandPowerSectionBody = observer(({className}: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  const { dreamlandPowers } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {dreamlandPowers.map((power, index) => (
        <PowerInput
          key={index}
          power={power}
          className="tw-mb-1"
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
