import { observer } from "mobx-react-lite";
import { TemporalConditionInput } from "./TemporalConditionInput";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const TemporalConditionSectionBody = observer(({ className }: Props) => {
  const { temporalConditions } = charSheetService._charSheet;

  return (
    <div className={className}>
      {temporalConditions.map((condition, index) => (
        <TemporalConditionInput
          key={index}
          temporalCondition={condition}
          onChangeName={(name) =>
            charSheetService.setTemporalConditionName(index, name)
          }
          onChangeValue={(value) =>
            charSheetService.setTemporalConditionValue(index, value)
          }
          removeCondition={() => {
            charSheetService.removeTemporalCondition(index);
          }}
        />
      ))}
    </div>
  );
});
