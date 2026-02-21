import { observer } from "mobx-react-lite";
import { CharacterConditionInput } from "../../unitComponents/CharacterConditionInput";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const BodyWoundSectionBody = observer(({ className }: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  const { bodyWounds } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {bodyWounds.map((bw, index) => (
        <CharacterConditionInput
          key={index}
          characterCondition={bw}
          className="tw-mb-1"
          onChangeName={(name) =>
            charSheetEditorUiStore.setBodyWoundName(index, name)
          }
          onChangeValue={(value) =>
            charSheetEditorUiStore.setBodyWoundValue(index, value)
          }
          onChangeInjury={(isInjury) =>
            charSheetEditorUiStore.setBodyWoundInjury(index, isInjury)
          }
          removeCondition={() => {
            charSheetEditorUiStore.removeBodyWound(index);
          }}
        />
      ))}
    </div>
  );
});
