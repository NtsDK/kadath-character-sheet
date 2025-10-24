import { observer } from "mobx-react-lite";
import { PowerInput } from "../unitComponents/PowerInput";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const PowerSectionBody = observer(({className}: Props) => {
  const { powers } = charSheetService._charSheet;
  return (
    <div className={className}>
      {powers.map((power, index) => (
        <PowerInput
          key={index}
          power={power}
          onChangeName={(name) => charSheetService.setPowerName(index, name)}
          onChangeValue={(value) =>
            charSheetService.setPowerValue(index, value)
          }
          removePower={() => {
            charSheetService.removePower(index);
          }}
        />
      ))}
    </div>
  );
});
