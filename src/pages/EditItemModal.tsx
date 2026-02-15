import { Form, Input, InputNumber, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Item } from "../domain/CharSheet";
import { hasNumberInStr } from "../utils/hasNumberInStr";
import { InputError } from "../unitComponents/InputError";

type Props = {
  title?: string;
  isModalOpen: boolean;
  handleOk: (item: Item) => void;
  validateName?: (name: string) => string | null;
  handleCancel: () => void;
  defaultItem?: Item;
};

export const EditItemModal = observer(
  ({ title, isModalOpen, handleCancel, handleOk, defaultItem }: Props) => {
    const [name, setName] = useState(defaultItem?.name || "");
    const [power1, setPower1] = useState(defaultItem?.powers[0] || "");
    const [power2, setPower2] = useState(defaultItem?.powers[1] || "");
    const [currentStrength, setCurrentStrength] = useState(
      defaultItem?.currentStrength || 0,
    );
    const [maxStrength, setMaxStrength] = useState(
      defaultItem?.maxStrength || 0,
    );
    const [errors, setErrors] = useState<(string | undefined)[]>([undefined, undefined, undefined]);

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
      setName(event.target.value);
    }

    function onChangePower1(event: React.ChangeEvent<HTMLInputElement>) {
      setPower1(event.target.value);
    }

    function onChangePower2(event: React.ChangeEvent<HTMLInputElement>) {
      setPower2(event.target.value);
    }

    function onChangeCurrentStrength(value: number | null) {
      setCurrentStrength(value || 0);
    }

    function onChangeMaxStrength(value: number | null) {
      setMaxStrength(value || 0);
    }

    function onOk() {
      const errors = [
        validateItemName(name),
        validatePower(power1),
        validatePower(power2),
      ];
      if (errors.some((error) => error !== undefined)) {
        setErrors(errors);
        return;
      }

      handleOk({
        name,
        powers: [power1, power2].filter((power) => power.trim() !== ""),
        currentStrength,
        maxStrength,
      });
    }

    return (
      <Modal
        title={title}
        open={isModalOpen}
        onOk={onOk}
        onCancel={handleCancel}
        cancelText="Отмена"
        okText="ОК"
        width={800}
      >
        <Form labelCol={{ span: 6 }}>
          <Form.Item label="Название">
            <Input
              placeholder="Введите название замысла"
              value={name}
              onChange={onChangeName}
              status={errors[0] ? "error" : undefined}
            />
            <InputError error={errors[0]} />
          </Form.Item>
          <Form.Item label="Сила 1">
            <Input
              placeholder="Введите название силы"
              value={power1}
              onChange={onChangePower1}
              status={errors[1] ? "error" : undefined}
            />
            <InputError error={errors[1]} />
          </Form.Item>
          <Form.Item label="Сила 2">
            <Input
              placeholder="Введите название силы"
              value={power2}
              onChange={onChangePower2}
              status={errors[2] ? "error" : undefined}
            />
            <InputError error={errors[2]} />
          </Form.Item>
          <Form.Item label="Текущая прочность">
            <InputNumber
              min={0}
              value={currentStrength}
              onChange={onChangeCurrentStrength}
            />
          </Form.Item>
          <Form.Item label="Максимальная прочность">
            <InputNumber
              min={0}
              value={maxStrength}
              onChange={onChangeMaxStrength}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);


function validateItemName(name: string): string | undefined {
  const trimmedName = name.trim();
  if (trimmedName === "") {
    return "Имя не может быть пустым";
  }
  if (!hasNumberInStr(trimmedName)) {
    return "Название должно содержать число";
  }
  return undefined;
}

function validatePower(power: string): string | undefined {
  const trimmedPower = power.trim();
  if (trimmedPower === "") {
    return undefined;
  }
  if (!hasNumberInStr(trimmedPower)) {
    return "Сила должна содержать число";
  }
  return undefined;
}
