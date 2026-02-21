import { observer } from "mobx-react-lite";
import { PowerInput } from "../../unitComponents/PowerInput";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const PowerSectionBody = observer(({className}: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  const { powers } = charSheetEditorUiStore.charSheet;
  return (
    <div className={className}>
      {powers.map((power, index) => (
        <PowerInput
          key={index}
          power={power}
          className="tw-mb-1"
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
