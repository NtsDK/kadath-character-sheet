import { observer } from "mobx-react-lite";
import { Input, Button, InputNumber } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

import { EditItemModal } from "../../pages/EditItemModal";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const ItemSectionBody = observer(({ className }: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  const { items } = charSheetEditorUiStore.charSheet;
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(0);

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="tw-flex tw-items-start tw-gap-2 tw-mb-2">
          <div className="tw-flex-1">
            <div className="tw-flex">
              <div className="tw-flex-1">{item.name}</div>
              <div>
                <InputNumber
                  value={item.currentStrength}
                  min={0}
                  className="tw-w-12"
                  max={item.maxStrength}
                  onChange={(value) =>
                    charSheetEditorUiStore.setItemCurrentStrength(
                      index,
                      value || 0,
                    )
                  }
                />{" "}
                ({item.maxStrength})+{Math.floor(item.currentStrength / 2)}
              </div>
            </div>
            {item.powers.map((power, powerIndex) => (
              <div key={powerIndex} className="tw-ml-8">{power}</div>
            ))}
          </div>
          <Button
            onClick={() => {
              setEditItemIndex(index);
              setIsEditItemModalOpen(true);
            }}
            icon={<EditOutlined className="tw-w-3" />}
          />
          <Button
            onClick={() => charSheetEditorUiStore.removeItem(index)}
            icon={<CloseOutlined className="tw-w-2" />}
          />
        </div>
      ))}
      <EditItemModal
        key={editItemIndex}
        title="Изменить предмет"
        isModalOpen={isEditItemModalOpen}
        handleOk={(item) => {
          charSheetEditorUiStore.updateItem(editItemIndex, item);
          setIsEditItemModalOpen(false);
        }}
        defaultItem={items[editItemIndex]}
        handleCancel={() => setIsEditItemModalOpen(false)}
      />
    </div>
  );
});
