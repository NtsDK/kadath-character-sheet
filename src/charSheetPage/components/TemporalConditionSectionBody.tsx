import { observer } from "mobx-react-lite";

import { TemporalConditionInput } from "../../unitComponents/TemporalConditionInput";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const TemporalConditionSectionBody = observer(({ className }: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  const { temporalConditions } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {temporalConditions.map((condition, index) => (
        <TemporalConditionInput
          key={index}
          temporalCondition={condition}
          onChangeName={(name) =>
            charSheetEditorUiStore.setTemporalConditionName(index, name)
          }
          onChangeValue={(value) =>
            charSheetEditorUiStore.setTemporalConditionValue(index, value)
          }
          removeCondition={() => {
            charSheetEditorUiStore.removeTemporalCondition(index);
          }}
        />
      ))}
    </div>
  );
});
