import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { Segmented } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Recollection } from "../domain/CharSheet";

type Props = {
  recollection: Recollection;
  onChangeName: (name: string) => void;
  onChangeValue: (value: number) => void;
  removeRecollection: () => void;
};

export const RecollectionInput = observer(
  ({ recollection, onChangeName, onChangeValue, removeRecollection }: Props) => {
    return (
      <div className="tw-flex">
        <Input
          value={recollection.name}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <Segmented<number>
          options={[1, 2, 3, 4, 5, 6]}
          value={recollection.value}
          onChange={onChangeValue}
        />
        <Button onClick={removeRecollection}>
          <XMarkIcon className="tw-h-3" />
        </Button>
      </div>
    );
  }
);