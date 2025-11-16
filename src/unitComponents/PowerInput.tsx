import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { Segmented } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Power } from "../domain/CharSheet";

type Props = {
  power: Power;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  removePower: () => void;
};

export const PowerInput = observer(
  ({ power, onChangeName, onChangeValue, removePower }: Props) => {
    return (
      <div className="tw-flex">
        <Input
          value={power.name}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <Segmented<number> options={[1, 2, 3]} onChange={onChangeValue} value={power.value}/>
        <Button onClick={removePower}>
          <XMarkIcon className="tw-h-3" />
        </Button>
      </div>
    );
  }
);
