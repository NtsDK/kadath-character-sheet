import { observer } from "mobx-react-lite";
import { CharacterConditionInput } from "../unitComponents/CharacterConditionInput";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const BodyWoundSectionBody = observer(({ className }: Props) => {
  const { bodyWounds } = charSheetService._charSheet;

  return (
    <div className={className}>
      {bodyWounds.map((bw, index) => (
        <CharacterConditionInput
          key={index}
          characterCondition={bw}
          onChangeName={(name) =>
            charSheetService.setBodyWoundName(index, name)
          }
          onChangeValue={(value) =>
            charSheetService.setBodyWoundValue(index, value)
          }
          onChangeInjury={(isInjury) =>
            charSheetService.setBodyWoundInjury(index, isInjury)
          }
          removeCondition={() => {
            charSheetService.removeBodyWound(index);
          }}
        />
      ))}
    </div>
  );
});
