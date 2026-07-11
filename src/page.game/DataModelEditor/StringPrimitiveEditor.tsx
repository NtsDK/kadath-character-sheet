import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import type { StringItem } from "../../domain/GameDataModel";

type Props = {
  item: StringItem;
  onChange: (modelItem: Partial<StringItem>) => void;
};

export const StringPrimitiveEditor = observer(({ item, onChange }: Props) => {
  return (
    <div>
      <Form.Item
        label="Значение по умолчанию"
        // layout="vertical"
        className="tw-mb-0"
        labelCol={{ span: 9 }}
      >
        <Input
          value={item.value}
          onChange={(e) =>
            onChange({
              value: e.target.value,
            })
          }
        />
      </Form.Item>
    </div>
  );
});
