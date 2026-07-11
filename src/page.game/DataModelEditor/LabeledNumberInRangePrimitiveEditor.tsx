import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import { getGameEditorUiStore } from "../../IoC";
import type { LabeledNumberInRangeItem } from "../../domain/GameDataModel";

type Props = {
  item: LabeledNumberInRangeItem;
  onChange: (modelItem: Partial<LabeledNumberInRangeItem>) => void;
};

export const LabeledNumberInRangePrimitiveEditor = observer(
  ({ item, onChange }: Props) => {
    return (
      <div>
        <Form.Item
          label="Подпись по умолчанию"
          // layout="vertical"
          className="tw-mb-0"
          labelCol={{ span: 9 }}
        >
          <Input
            value={item.label}
            onChange={(e) =>
              onChange({
                label: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Минимум"
          // layout="vertical"
          className="tw-mb-0"
          labelCol={{ span: 9 }}
        >
          <Input
            type="number"
            value={item.min}
            onChange={(e) =>
              onChange({
                min: Number(e.target.value),
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Максимум"
          // layout="vertical"
          className="tw-mb-0"
          labelCol={{ span: 9 }}
        >
          <Input
            type="number"
            value={item.max}
            onChange={(e) =>
              onChange({
                max: Number(e.target.value),
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Значение по умолчанию"
          // layout="vertical"
          className="tw-mb-0"
          labelCol={{ span: 9 }}
        >
          <Input
            type="number"
            value={item.value}
            min={item.min}
            max={item.max}
            onChange={(e) =>
              onChange({
                value: Number(e.target.value),
              })
            }
          />
        </Form.Item>
      </div>
    );
  },
);
