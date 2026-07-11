import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import { getGameEditorUiStore } from "../../IoC";
import type {
  ListItem,
  NumberItem,
  PrimitiveItem,
} from "../../domain/GameDataModel";

import { PrimitiveEditor } from "./PrimitiveEditor";

type Props = {
  id: string;
  item: ListItem;
};

export const ListEditor = observer(({ id, item }: Props) => {
  const uiStore = getGameEditorUiStore();
  return (
    <div>
      <Form.Item
        label="Начальный размер списка"
        // layout="vertical"
        className="tw-mb-0"
        labelCol={{ span: 9 }}
      >
        <Input
          type="number"
          value={item.initialLength}
          min={0}
          max={item.maxLength}
          onChange={(e) => {
            uiStore.editModelItemProps<ListItem>(id, {
              initialLength: Number(e.target.value),
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label="Максимальный размер списка"
        // layout="vertical"
        className="tw-mb-0"
        labelCol={{ span: 9 }}
      >
        <Input
          type="number"
          value={item.maxLength}
          onChange={(e) => {
            uiStore.editModelItemProps<ListItem>(id, {
              maxLength:
                e.target.value.trim() === ""
                  ? undefined
                  : Number(e.target.value),
            });
          }}
        />
      </Form.Item>
      <div className="tw-ml-12">
        <PrimitiveEditor
          item={item.proto}
          onChange={function (modelItem: Partial<PrimitiveItem>): void {
            uiStore.editModelItemProps<ListItem>(id, {
              ...item,
              // @ts-expect-error - TypeScript cannot infer the type of item.proto here, but we know it's a PrimitiveItem
              proto: {
                ...item.proto,
                ...modelItem,
              },
            });
          }}
        />
      </div>
    </div>
  );
});
