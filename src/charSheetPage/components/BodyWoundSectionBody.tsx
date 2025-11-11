import { observer } from "mobx-react-lite";
import { CharacterConditionInput } from "../../unitComponents/CharacterConditionInput";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const BodyWoundSectionBody = observer(({ className }: Props) => {
  const { bodyWounds } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {bodyWounds.map((bw, index) => (
        <CharacterConditionInput
          key={index}
          characterCondition={bw}
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
