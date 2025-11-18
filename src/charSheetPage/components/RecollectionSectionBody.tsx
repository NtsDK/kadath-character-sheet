import { observer } from "mobx-react-lite";
import { RecollectionInput } from "../../unitComponents/RecollectionInput";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const RecollectionSectionBody = observer(({ className }: Props) => {
  const { recollections } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {recollections.map((recollection, index) => (
        <RecollectionInput
          key={index}
          recollection={recollection}
          className="tw-mb-1"
          onChangeName={(name) =>
            charSheetEditorUiStore.setRecollectionName(index, name)
          }
          onChangeValue={(value) =>
            charSheetEditorUiStore.setRecollectionValue(index, value)
          }
          removeRecollection={() => {
            charSheetEditorUiStore.removeRecollection(index);
          }}
        />
      ))}
    </div>
  );
});
