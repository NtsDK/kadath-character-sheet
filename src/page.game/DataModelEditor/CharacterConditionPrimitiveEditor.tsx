import { observer } from "mobx-react-lite";
import { Checkbox, Form, Input } from "antd";

import type { CharacterCondition } from "../../domain/GameDataModel";

type Props = {
  item: CharacterCondition;
  onChange: (modelItem: Partial<CharacterCondition>) => void;
};

export const CharacterConditionPrimitiveEditor = observer(
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
        <Form.Item
          label="Флаг увечья по умолчанию"
          // layout="vertical"
          className="tw-mb-0"
          labelCol={{ span: 9 }}
        >
          <Checkbox
            onChange={(e) =>
              onChange({
                isInjury: e.target.checked,
              })
            }
            checked={item.isInjury}
          ></Checkbox>
        </Form.Item>
      </div>
    );
  },
);
