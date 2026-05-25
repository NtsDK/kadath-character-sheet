import { Input, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import classnames from "classnames";

import { VALIDATE_ID_REGEX, VALIDATE_NAME_REGEX } from "../utils/nameValidation";
import { InputError } from "../unitComponents/InputError";
import { getGameStore } from "../IoC";

type Props = {
  title?: string;
  isModalOpen: boolean;
  handleOk: (name: string, id: string) => void;
  handleCancel: () => void;
  defaultNameValue?: string;
  defaultIdValue?: string;
};

export const RenameGameModal = observer(
  ({
    title,
    isModalOpen,
    handleCancel,
    handleOk,
    defaultNameValue,
    defaultIdValue,
  }: Props) => {
    const [name, setName] = useState(defaultNameValue || "");
    const [id, setId] = useState(defaultIdValue || "");
    const [nameError, setNameError] = useState<undefined | string>();
    const [idError, setIdError] = useState<undefined | string>();

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setNameError(undefined);
      setName(event.target.value);
    }
    function onIdChange(event: React.ChangeEvent<HTMLInputElement>) {
      setIdError(undefined);
      setId(event.target.value);
    }

    function onOk() {
      const trimmedName = name.trim();
      const nameErrorCheck = validateName(trimmedName, defaultNameValue);
      if (nameErrorCheck) {
        setNameError(nameErrorCheck);
      }
      const trimmedId = id.trim();
      const idErrorCheck = validateId(trimmedId, defaultIdValue);
      if (idErrorCheck) {
        setIdError(idErrorCheck);
      }
      if (!nameErrorCheck && !idErrorCheck) {
        handleOk(trimmedName, trimmedId);
      }
    }

    return (
      <Modal
        title={title}
        open={isModalOpen}
        onOk={onOk}
        onCancel={handleCancel}
        cancelText="Отмена"
        okText="ОК"
      >
        <Input
          placeholder="Введите название игры"
          value={name}
          onChange={onNameChange}
          status={nameError ? "error" : undefined}
          onPressEnter={() => onOk()}
        />
        <InputError error={nameError} />
        <Input
          placeholder="Введите идентификатор игры"
          value={id}
          onChange={onIdChange}
          status={idError ? "error" : undefined}
          onPressEnter={() => onOk()}
        />
        <InputError error={idError} />
      </Modal>
    );
  },
);

function validateName(name: string, prevName: string | undefined): string | null {
  if (name === "") {
    return "Название не может быть пустым";
  }
  if (!VALIDATE_NAME_REGEX.test(name)) {
    return "Название может содержать только буквы, цифры, пробелы, символ подчеркивания, апостроф и круглые скобки";
  }
  if (name !== prevName && getGameStore().isNameUsed(name)) {
    return "Название уже используется";
  }
  return null;
}

function validateId(id: string, prevId: string | undefined): string | null {
  if (id === "") {
    return "Идентификатор не может быть пустым";
  }
  if (!VALIDATE_ID_REGEX.test(id)) {
    return "Идентификатор может содержать только латинские буквы, цифры, черточку и символ подчеркивания";
  }
  if (id !== prevId && getGameStore().isIdUsed(id)) {
    return "Идентификатор уже используется";
  }
  return null;
}
