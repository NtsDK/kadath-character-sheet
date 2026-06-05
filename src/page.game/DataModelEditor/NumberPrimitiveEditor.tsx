import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import { getGameEditorUiStore } from "../../IoC";
import type { NumberItem } from "../../domain/GameDataModel";

type Props = {
  id: string;
  item: NumberItem;
};

export const NumberPrimitiveEditor = observer(({ id, item }: Props) => {
  const uiStore = getGameEditorUiStore();
  return (
    <div>
      <Form.Item label="Минимум" layout="vertical" className="tw-mb-0">
        <Input
          type="number"
          value={item.min}
          onChange={(e) => {
            uiStore.editModelItemProps<NumberItem>(id, {
              min: Number(e.target.value),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Максимум" layout="vertical" className="tw-mb-0">
        <Input
          type="number"
          value={item.max}
          onChange={(e) => {
            uiStore.editModelItemProps<NumberItem>(id, {
              max: Number(e.target.value),
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label="Значение по умолчанию"
        layout="vertical"
        className="tw-mb-0"
      >
        <Input
          type="number"
          value={item.value}
          min={item.min}
          max={item.max}
          onChange={(e) => {
            uiStore.editModelItemProps<NumberItem>(id, {
              value: Number(e.target.value),
            });
          }}
        />
      </Form.Item>
    </div>
  );
});
