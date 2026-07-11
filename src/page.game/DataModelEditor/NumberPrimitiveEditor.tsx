import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import type { NumberItem } from "../../domain/GameDataModel";

type Props = {
  item: NumberItem;
  onChange: (modelItem: Partial<NumberItem>) => void;
};

export const NumberPrimitiveEditor = observer(({ item, onChange }: Props) => {
  return (
    <div>
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
});
