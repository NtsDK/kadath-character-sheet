import { observer } from "mobx-react-lite";
import { Input, Modal } from "antd";
import { useState } from "react";

import { InputError } from "../../unitComponents/InputError";
import type { ListItem, PrimitiveItem } from "../../domain/GameDataModel";

type TypeMeta =
  | {
      type: PrimitiveItem["type"];
    }
  | {
      type: ListItem["type"];
      proto: PrimitiveItem["type"];
    };

type Props = {
  title?: string;
  isModalOpen: boolean;
  handleOk: (name: string, id: string) => void;
  validateName?: (name: string) => string | null;
  handleCancel: () => void;

  defaultName?: string;
  defaultItemTitle?: string;
  defaultTypeMeta?: TypeMeta;
};

export const EditModelItemModal = observer(
  ({
    title,
    isModalOpen,
    handleOk,
    validateName,
    handleCancel,
    defaultName,
    defaultItemTitle,
    defaultTypeMeta,
  }: Props) => {
    const [name, setName] = useState(defaultName || "");
    const [itemTitle, setItemTitle] = useState(defaultItemTitle || "");
    const [typeMeta, setTypeMeta] = useState<TypeMeta>(
      defaultTypeMeta || { type: "string" },
    );
    const [nameError, setNameError] = useState<undefined | string>();
    // const [itemTitleError, setItemTitleError] = useState<undefined | string>();

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setNameError(undefined);
      setName(event.target.value);
    }
    function onItemTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setItemTitle(event.target.value);
    }
    function onOk() {
      const trimmedName = name.trim();
      // const nameErrorCheck = validateName(trimmedName, defaultNameValue);
      // if (nameErrorCheck) {
      //   setNameError(nameErrorCheck);
      // }
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
          placeholder="Введите внутреннее название элемента модели"
          value={name}
          onChange={onNameChange}
          status={nameError ? "error" : undefined}
          onPressEnter={() => onOk()}
        />
        <InputError error={nameError} />
        <Input
          placeholder="Введите отображаемое название элемента модели"
          value={itemTitle}
          onChange={onItemTitleChange}
          // status={idError ? "error" : undefined}
          onPressEnter={() => onOk()}
        />
        {/* <InputError error={idError} /> */}
      </Modal>
    );
  },
);
