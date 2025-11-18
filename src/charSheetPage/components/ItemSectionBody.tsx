import { observer } from "mobx-react-lite";
import { Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { charSheetEditorUiStore } from "../CharSheetEditorUiStore";

type Props = {
  className?: string;
};

export const ItemSectionBody = observer(({ className }: Props) => {
  const { items } = charSheetEditorUiStore.charSheet;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="tw-flex tw-items-center tw-mb-1">
          <Input
            value={item}
            onChange={(e) =>
              charSheetEditorUiStore.setItemName(index, e.target.value)
            }
          />
          <Button
            onClick={() => charSheetEditorUiStore.removeItem(index)}
            icon={<CloseOutlined className="tw-w-2" />}
          />
        </div>
      ))}
    </div>
  );
});
