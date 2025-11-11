import { observer } from "mobx-react-lite";
import { Input, Button } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const ItemSectionBody = observer(({ className }: Props) => {
  const { items } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="tw-flex tw-items-center">
          <Input
            value={item}
            onChange={(e) =>
              charSheetEditorUiStore.setItemName(index, e.target.value)
            }
          />
          <Button onClick={() => charSheetEditorUiStore.removeItem(index)}>
            <XMarkIcon className="tw-h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
});
