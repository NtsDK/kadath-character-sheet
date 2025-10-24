import { Button, Input, InputNumber, Radio } from "antd";
import { observer } from "mobx-react-lite";
import { XMarkIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";

import { CharacterCondition } from "../domain/CharSheet";

type Props = {
  characterCondition: CharacterCondition;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  onChangeInjury: (isInjury: boolean) => void;
  removeCondition: () => void;
};

export const CharacterConditionInput = observer(
  ({ characterCondition, onChangeName, onChangeValue, onChangeInjury, removeCondition }: Props) => {
    return (
      <div className="tw-flex tw-items-center">
        <Input
          value={characterCondition.name}
          onChange={(e) => onChangeName(e.target.value)}
        />

        <InputNumber value={characterCondition.value} onChange={(value) => onChangeValue(value || 0)}/>

        <Button onClick={() => onChangeInjury(!characterCondition.isInjury)}>
          <HandThumbDownIcon className={classnames("tw-h-4", {
            "tw-invisible": !characterCondition.isInjury
          })} />
        </Button>

        <Button onClick={removeCondition}>
          <XMarkIcon className="tw-h-3" />
        </Button>
      </div>
    );
  }
);
