import { Button, Input , Segmented } from "antd";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";

import { Recollection } from "../domain/CharSheet";

type Props = {
  recollection: Recollection;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  removeRecollection: () => void;
  className?: string;
};

export const RecollectionInput = observer(
  ({
    recollection,
    onChangeName,
    onChangeValue,
    removeRecollection,
    className,
  }: Props) => {
    return (
      <div className={classNames("tw-flex", className)}>
        <Input
          value={recollection.name}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <Segmented<number>
          options={[1, 2, 3, 4, 5, 6]}
          value={recollection.value}
          onChange={onChangeValue}
        />
        <Button
          onClick={removeRecollection}
          icon={<CloseOutlined className="tw-w-2" />}
        />
      </div>
    );
  }
);
