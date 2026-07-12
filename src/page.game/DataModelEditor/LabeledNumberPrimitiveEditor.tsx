import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import type { LabeledNumberItem } from "../../domain/GameDataModel";

type Props = {
  item: LabeledNumberItem;
  onChange: (modelItem: Partial<LabeledNumberItem>) => void;
};

export const LabeledNumberPrimitiveEditor = observer(
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
          label="Значение по умолчанию"
          // layout="vertical"
          className="tw-mb-0"
          labelCol={{ span: 9 }}
        >
          <Input
            type="number"
            value={item.value}
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
