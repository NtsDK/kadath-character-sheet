import { observer } from "mobx-react-lite";
import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import * as R from "ramda";

import { InputError } from "../../unitComponents/InputError";
import type { TypeMeta } from "../../domain/GameDataModel";
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

type TypeCodes =
  | "projectList"
  | "gearItemList"
  | "characterConditionList"
  | "string"
  | "number"
  | "labeledNumberList"
  | "labeledNumberInRangeList"
  | "labeledNumberInRange";

type DisplayItemType = {
  typeMeta: TypeMeta;
  label: string;
  value: TypeCodes;
};

const typeOptions: DisplayItemType[] = [
  {
    typeMeta: {
      type: "list",
      proto: "project",
    },
    label: "Список замыслов",
    value: "projectList",
  },
  {
    typeMeta: {
      type: "list",
      proto: "gearItem",
    },
    label: "Список предметов",
    value: "gearItemList",
  },
  {
    typeMeta: {
      type: "list",
      proto: "characterCondition",
    },
    label: "Список состояний (раны и душевные состояния)",
    value: "characterConditionList",
  },
  {
    typeMeta: {
      type: "string",
    },
    label: "Текст (заметки)",
    value: "string",
  },
  {
    typeMeta: {
      type: "number",
    },
    label: "Число (удача)",
    value: "number",
  },
  {
    typeMeta: {
      type: "list",
      proto: "labeledNumber",
    },
    label: "Список чисел с подписью (трудности и преимущества)",
    value: "labeledNumberList",
  },
  {
    typeMeta: {
      type: "list",
      proto: "labeledNumberInRange",
    },
    label: "Список чисел в диапазоне с подписью (силы, воспоминания)",
    value: "labeledNumberInRangeList",
  },
  {
    typeMeta: {
      type: "labeledNumberInRange",
    },
    label: "Число в диапазоне с подписью (слабость)",
    value: "labeledNumberInRange",
  },
];

typeOptions.sort((a, b) => a.label.localeCompare(b.label));

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
    const [typeCode, setTypeCode] = useState<TypeCodes>(
      typeOptions.find((el) => R.equals(el.typeMeta, defaultTypeMeta))?.value ||
        "string",
    );
    const [idError, setIdError] = useState<undefined | string>();

    function onIdChange(event: React.ChangeEvent<HTMLInputElement>) {
      setIdError(undefined);
      setId(event.target.value);
    }
    function onTypeChange(value: TypeCodes) {
      setTypeCode(value);
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
        handleOk(
          id,
          itemName,
          typeOptions.find((el) => el.value === typeCode)?.typeMeta || {
            type: "string",
          },
        );
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
          <Select<TypeCodes>
            value={typeCode}
            style={{ width: 450 }}
            onChange={onTypeChange}
            options={typeOptions}
          />
        </Form.Item>
      </Modal>
    );
  },
);

function validateId(id: string, prevId: string | undefined): string | null {
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
