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
  handleOk: (id: string, name: string, typeMeta: TypeMeta) => void;
  handleCancel: () => void;

  defaultId?: string;
  defaultItemName?: string;
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
    defaultId: defaultId,
    defaultItemName: defaultItemName,
    defaultTypeMeta,
  }: Props) => {
    const [id, setId] = useState(defaultId || "");
    const [itemName, setItemName] = useState(defaultItemName || "");
    const [typeMeta, setTypeMeta] = useState<TypeMeta>(
      defaultTypeMeta || { type: "string" },
    );
    const [idError, setIdError] = useState<undefined | string>();

    function onIdChange(event: React.ChangeEvent<HTMLInputElement>) {
      setIdError(undefined);
      setId(event.target.value);
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
    function onItemNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setItemName(event.target.value);
    }
    function onOk() {
      const trimmedId = id.trim();
      const idErrorCheck = validateId(trimmedId, defaultId);
      if (idErrorCheck) {
        setIdError(idErrorCheck);
      }
      if (!idErrorCheck) {
        handleOk(id, itemName, typeMeta);
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
            value={id}
            onChange={onIdChange}
            status={idError ? "error" : undefined}
            onPressEnter={() => onOk()}
          />
          <InputError error={idError} />
        </Form.Item>
        <Form.Item
          label="Представление элемента модели"
          layout="vertical"
          className="tw-mb-2"
        >
          <Input
            placeholder="Введите отображаемое название элемента модели"
            value={itemName}
            onChange={onItemNameChange}
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

function validateId(
  id: string,
  prevId: string | undefined,
): string | null {
  if (id === "") {
    return "Внутреннее название не может быть пустым";
  }
  if (!VALIDATE_ID_REGEX.test(id)) {
    return "Внутреннее название может содержать только латинские буквы, цифры, черточку и символ подчеркивания";
  }
  if (id !== prevId && getGameEditorUiStore().isItemIdUsed(id)) {
    return "Внутреннее название уже используется";
  }
  return null;
}
