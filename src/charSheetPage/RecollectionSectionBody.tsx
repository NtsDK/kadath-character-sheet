import { observer } from "mobx-react-lite";
import { RecollectionInput } from "../unitComponents/RecollectionInput";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const RecollectionSectionBody = observer(({ className }: Props) => {
  const { recollections } = charSheetService._content;

  return (
    <div className={className}>
      {recollections.map((recollection, index) => (
        <RecollectionInput
          key={index}
          recollection={recollection}
          onChangeName={(name) =>
            charSheetService.setRecollectionName(index, name)
          }
          onChangeValue={(value) =>
            charSheetService.setRecollectionValue(index, value)
          }
          removeRecollection={() => {
            charSheetService.removeRecollection(index);
          }}
        />
      ))}
    </div>
  );
});
