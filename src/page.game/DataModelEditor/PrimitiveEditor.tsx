import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";

import { getGameEditorUiStore } from "../../IoC";
import type {
  LabeledNumberInRangeItem,
  NumberItem,
  PrimitiveItem,
  StringItem,
} from "../../domain/GameDataModel";

import { StringPrimitiveEditor } from "./StringPrimitiveEditor";
import { NumberPrimitiveEditor } from "./NumberPrimitiveEditor";
import { LabeledNumberInRangePrimitiveEditor } from "./LabeledNumberInRangePrimitiveEditor";
import { LabeledNumberPrimitiveEditor } from "./LabeledNumberPrimitiveEditor";
import { CharacterConditionPrimitiveEditor } from "./CharacterConditionPrimitiveEditor";

type Props<T extends PrimitiveItem> = {
  item: T;
  onChange: (modelItem: Partial<T>) => void;
};

export const PrimitiveEditor = observer(
  <T extends PrimitiveItem>({ item, onChange }: Props<T>) => {
    return (
      <>
        {item.type === "string" && (
          // @ts-expect-error - TypeScript cannot infer the type of T here, but we know it's a StringItem
          <StringPrimitiveEditor item={item} onChange={onChange} />
        )}
        {item.type === "number" && (
          // @ts-expect-error - TypeScript cannot infer the type of T here, but we know it's a NumberItem
          <NumberPrimitiveEditor item={item} onChange={onChange} />
        )}
        {item.type === "labeledNumberInRange" && (
          <LabeledNumberInRangePrimitiveEditor
            item={item}
            // @ts-expect-error - TypeScript cannot infer the type of T here, but we know it's a LabeledNumberInRangeItem
            onChange={onChange}
          />
        )}
        {item.type === "labeledNumber" && (
          // @ts-expect-error - TypeScript cannot infer the type of T here, but we know it's a LabeledNumberItem
          <LabeledNumberPrimitiveEditor item={item} onChange={onChange} />
        )}
        {item.type === "characterCondition" && (
          // @ts-expect-error - TypeScript cannot infer the type of T here, but we know it's a CharacterCondition
          <CharacterConditionPrimitiveEditor item={item} onChange={onChange} />
        )}
        {/* {item.type === "gearItem" && "gearItem"}
        {item.type === "project" && "project"} */}
      </>
    );
  },
);
