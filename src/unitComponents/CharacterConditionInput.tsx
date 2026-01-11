import { Button, Input, InputNumber, Radio } from "antd";
import { observer } from "mobx-react-lite";
import { HandThumbDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";

import { CharacterCondition } from "../domain/CharSheet";

type Props = {
  characterCondition: CharacterCondition;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  onChangeInjury: (isInjury: boolean) => void;
  removeCondition: () => void;
  className?: string;
};

export const CharacterConditionInput = observer(
  ({
    characterCondition,
    onChangeName,
    onChangeValue,
    onChangeInjury,
    removeCondition,
    className,
  }: Props) => {
    return (
      <div className={classNames("tw-flex tw-items-center", className)}>
        <Input
          value={characterCondition.name}
          onChange={(e) => onChangeName(e.target.value)}
        />

        <InputNumber
          value={characterCondition.value}
          onChange={(value) => onChangeValue(value || 0)}
        />

        <Button onClick={() => onChangeInjury(!characterCondition.isInjury)} title="Увечье">
          <HandThumbDownIcon
            className={classNames("tw-h-4", {
              "tw-invisible": !characterCondition.isInjury,
            })}
          />
        </Button>

        <Button
          onClick={removeCondition}
          icon={<CloseOutlined className="tw-w-2" />}
        />
      </div>
    );
  }
);
