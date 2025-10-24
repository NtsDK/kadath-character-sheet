import { Button, Input, InputNumber, Radio } from "antd";
import { observer } from "mobx-react-lite";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { TemporalCondition } from "../domain/CharSheet";

type Props = {
  temporalCondition: TemporalCondition;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  removeCondition: () => void;
};

export const TemporalConditionInput = observer(
  ({ temporalCondition, onChangeName, onChangeValue, removeCondition }: Props) => {
    return (
      <div className="tw-flex tw-items-center">
        <Input
          value={temporalCondition.name}
          onChange={(e) => onChangeName(e.target.value)}
        />

        <InputNumber value={temporalCondition.value} onChange={(value) => onChangeValue(value || 0)}/>

        <Button onClick={removeCondition}>
          <XMarkIcon className="tw-h-3" />
        </Button>
      </div>
    );
  }
);
