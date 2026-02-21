import { observer } from "mobx-react-lite";
import { CharacterConditionInput } from "../../unitComponents/CharacterConditionInput";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const MentalConditionSectionBody = observer(({ className }: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
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
