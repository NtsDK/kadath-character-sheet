import { observer } from "mobx-react-lite";
import { Input, Button } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { charSheetService } from "../appServices/CharSheetService";

type Props = {
  className?: string;
};

export const ItemSectionBody = observer(({ className }: Props) => {
  const { items } = charSheetService._content;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="tw-flex tw-items-center">
          <Input
            value={item}
            onChange={(e) =>
              charSheetService.setItemName(index, e.target.value)
            }
          />
          <Button onClick={() => charSheetService.removeItem(index)}>
            <XMarkIcon className="tw-h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
});
