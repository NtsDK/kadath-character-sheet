import { observer } from "mobx-react-lite";
import { PowerInput } from "./PowerInput";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const DreamlandPowerSectionBody = observer(({className}: Props) => {
  const { dreamlandPowers } = charSheetService._charSheet;

  return (
    <div className={className}>
      {dreamlandPowers.map((power, index) => (
        <PowerInput
          key={index}
          power={power}
          onChangeName={(name) =>
            charSheetService.setDreamlandPowerName(index, name)
          }
          onChangeValue={(value) =>
            charSheetService.setDreamlandPowerValue(index, value)
          }
          removePower={() => {
            charSheetService.removeDreamlandPower(index);
          }}
        />
      ))}
    </div>
  );
});
