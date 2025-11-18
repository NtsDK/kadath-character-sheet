import { observer } from "mobx-react-lite";
import { CharacterConditionInput } from "../../unitComponents/CharacterConditionInput";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const MentalConditionSectionBody = observer(({ className }: Props) => {
  const { mentalConditions } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {mentalConditions.map((mc, index) => (
        <CharacterConditionInput
          key={index}
          characterCondition={mc}
          className="tw-mb-1"
          onChangeName={(name) =>
            charSheetEditorUiStore.setMentalConditionName(index, name)
          }
          onChangeValue={(value) =>
            charSheetEditorUiStore.setMentalConditionValue(index, value)
          }
          onChangeInjury={(isInjury) =>
            charSheetEditorUiStore.setMentalConditionInjury(index, isInjury)
          }
          removeCondition={() => {
            charSheetEditorUiStore.removeMentalCondition(index);
          }}
        />
      ))}
    </div>
  );
});
