import { Button, Input , Segmented } from "antd";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import { CloseOutlined } from "@ant-design/icons";

import { Power } from "../domain/CharSheet";

type Props = {
  power: Power;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  removePower: () => void;
  className?: string;
};

export const PowerInput = observer(
  ({ power, onChangeName, onChangeValue, removePower, className }: Props) => {
    return (
      <div className={classnames("tw-flex", className)}>
        <Input
          value={power.name}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <Segmented<number>
          options={[1, 2, 3]}
          onChange={onChangeValue}
          value={power.value}
        />
        <Button
          onClick={removePower}
          icon={<CloseOutlined className="tw-w-2" />}
        />
      </div>
    );
  }
);
