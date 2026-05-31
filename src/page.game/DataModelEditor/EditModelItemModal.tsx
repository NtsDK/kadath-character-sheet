import { observer } from "mobx-react-lite";
import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";

import { InputError } from "../../unitComponents/InputError";
import type {
  DataModelItem,
  ListItem,
  PrimitiveItem,
  TypeMeta,
} from "../../domain/GameDataModel";
import { VALIDATE_ID_REGEX } from "../../utils/nameValidation";
import { getGameEditorUiStore } from "../../IoC";

type Props = {
  title?: string;
  isModalOpen: boolean;
  handleOk: (name: string, title: string, typeMeta: TypeMeta) => void;
  handleCancel: () => void;

  defaultName?: string;
  defaultItemTitle?: string;
  defaultTypeMeta?: TypeMeta;
};

const protoTypeOptions: { value: PrimitiveItem["type"]; label: string }[] = [
  { value: "project", label: "Замысел" },
  { value: "gearItem", label: "Предмет" },
  { value: "characterCondition", label: "Состояние персонажа" },
  { value: "string", label: "Текст" },
  { value: "number", label: "Число" },
  { value: "labeledNumber", label: "Число с подписью" },
];
const typeOptions: { value: DataModelItem["type"]; label: string }[] = [
  ...protoTypeOptions,
  { value: "list", label: "Список" },
];

export const EditModelItemModal = observer(
  ({
    title,
    isModalOpen,
    handleOk,
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

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setNameError(undefined);
      setName(event.target.value);
    }
    function onTypeChange(value: DataModelItem["type"]) {
      if (value === "list") {
        setTypeMeta({
          type: "list",
          proto: "labeledNumber",
        });
      } else {
        setTypeMeta({
          type: value,
        });
      }
    }
    function onProtoTypeChange(value: PrimitiveItem["type"]) {
      setTypeMeta({
        type: "list",
        proto: value,
      });
    }
    function onItemTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setItemTitle(event.target.value);
    }
    function onOk() {
      const trimmedName = name.trim();
      const nameErrorCheck = validateName(trimmedName, defaultName);
      if (nameErrorCheck) {
        setNameError(nameErrorCheck);
      }
      if (!nameErrorCheck) {
        handleOk(name, itemTitle, typeMeta);
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
        <Form.Item
          label="Внутреннее название элемента модели"
          layout="vertical"
          className="tw-mb-2"
        >
          <Input
            placeholder="Введите внутреннее название элемента модели"
            value={name}
            onChange={onNameChange}
            status={nameError ? "error" : undefined}
            onPressEnter={() => onOk()}
          />
          <InputError error={nameError} />
        </Form.Item>
        <Form.Item
          label="Представление элемента модели"
          layout="vertical"
          className="tw-mb-2"
        >
          <Input
            placeholder="Введите отображаемое название элемента модели"
            value={itemTitle}
            onChange={onItemTitleChange}
            onPressEnter={() => onOk()}
          />
        </Form.Item>
        <Form.Item
          label="Тип элемента модели"
          layout="vertical"
          className="tw-mb-2"
        >
          <Select<DataModelItem["type"]>
            value={typeMeta.type}
            style={{ width: 300 }}
            onChange={onTypeChange}
            options={typeOptions}
          />
        </Form.Item>
        {typeMeta.type === "list" && (
          <Form.Item
            label="Тип элемента списка"
            layout="vertical"
            className="tw-mb-2"
          >
            <Select<PrimitiveItem["type"]>
              value={typeMeta.proto}
              style={{ width: 300 }}
              onChange={onProtoTypeChange}
              options={protoTypeOptions}
            />
          </Form.Item>
        )}
      </Modal>
    );
  },
);

function validateName(
  name: string,
  prevName: string | undefined,
): string | null {
  if (name === "") {
    return "Внутреннее название не может быть пустым";
  }
  if (!VALIDATE_ID_REGEX.test(name)) {
    return "Внутреннее название может содержать только латинские буквы, цифры, черточку и символ подчеркивания";
  }
  if (name !== prevName && getGameEditorUiStore().isItemNameUsed(name)) {
    return "Внутреннее название уже используется";
  }
  return null;
}
