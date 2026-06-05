import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import type { StringItem } from "../../domain/GameDataModel";
import { getGameEditorUiStore } from "../../IoC";

type Props = {
  id: string;
  item: StringItem;
};

export const StringPrimitiveEditor = observer(({ id, item }: Props) => {
  const uiStore = getGameEditorUiStore();
  return (
    <div>
      <Form.Item
        label="Значение по умолчанию"
        layout="vertical"
        className="tw-mb-0"
      >
        <Input
          value={item.value}
          onChange={(e) =>
            uiStore.editModelItemProps<StringItem>(id, {
              value: e.target.value,
            })
          }
        />
      </Form.Item>
    </div>
  );
});
