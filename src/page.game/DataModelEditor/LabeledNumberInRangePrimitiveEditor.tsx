import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import { getGameEditorUiStore } from "../../IoC";
import type { LabeledNumberInRangeItem } from "../../domain/GameDataModel";

type Props = {
  id: string;
  item: LabeledNumberInRangeItem;
};

export const LabeledNumberInRangePrimitiveEditor = observer(
  ({ id, item }: Props) => {
    const uiStore = getGameEditorUiStore();
    return (
      <div>
        <Form.Item
          label="Подпись по умолчанию"
          layout="vertical"
          className="tw-mb-0"
        >
          <Input
            value={item.label}
            onChange={(e) =>
              uiStore.editModelItemProps<LabeledNumberInRangeItem>(id, {
                label: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item label="Минимум" layout="vertical" className="tw-mb-0">
          <Input
            type="number"
            value={item.min}
            onChange={(e) => {
              uiStore.editModelItemProps<LabeledNumberInRangeItem>(id, {
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
              uiStore.editModelItemProps<LabeledNumberInRangeItem>(id, {
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
              uiStore.editModelItemProps<LabeledNumberInRangeItem>(id, {
                value: Number(e.target.value),
              });
            }}
          />
        </Form.Item>
      </div>
    );
  },
);
