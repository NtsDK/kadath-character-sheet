import { observer } from "mobx-react-lite";
import { CharacterConditionInput } from "../unitComponents/CharacterConditionInput";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const MentalConditionSectionBody = observer(({ className }: Props) => {
  const { mentalConditions } = charSheetService._charSheet;

  return (
    <div className={className}>
      {mentalConditions.map((mc, index) => (
        <CharacterConditionInput
          key={index}
          characterCondition={mc}
          onChangeName={(name) =>
            charSheetService.setMentalConditionName(index, name)
          }
          onChangeValue={(value) =>
            charSheetService.setMentalConditionValue(index, value)
          }
          onChangeInjury={(isInjury) =>
            charSheetService.setMentalConditionInjury(index, isInjury)
          }
          removeCondition={() => {
            charSheetService.removeMentalCondition(index);
          }}
        />
      ))}
    </div>
  );
});
