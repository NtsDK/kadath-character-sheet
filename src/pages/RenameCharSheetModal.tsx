import { Input, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import classnames from "classnames";
import { charSheetStore } from "../domainServices/CharSheetStore";
import { VALIDATE_NAME_REGEX } from "../utils/nameValidation";

type Props = {
  title?: string;
  isModalOpen: boolean;
  handleOk: (name: string) => void;
  validateName?: (name: string) => string | null;
  handleCancel: () => void;
  defaultValue?: string;
};

export const RenameCharSheetModal = observer(
  ({ title, isModalOpen, handleCancel, handleOk, defaultValue }: Props) => {
    const [name, setName] = useState(defaultValue || "");
    const [error, setError] = useState<undefined | string>();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      setError(undefined);
      setName(event.target.value);
    }

    function onOk() {
      const trimmedName = name.trim();
      if (trimmedName === "") {
        setError("Имя не может быть пустым");
        return;
      }
      if (!VALIDATE_NAME_REGEX.test(trimmedName)) {
        setError("Имя может содержать только буквы, цифры, пробелы и символ подчеркивания");
        return;
      }
      if (charSheetStore.isNameUsed(trimmedName)) {
        setError("Имя уже используется");
        return;
      }
      handleOk(trimmedName);
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
          placeholder="Введите имя персонажа"
          value={name}
          onChange={onChange}
          status={error ? "error" : undefined}
          onPressEnter={() => onOk()}
        />
        <div
          className={classnames("tw-text-red-600 tw-mt-1", {
            "tw-invisible": !error,
          })}
        >
          {error}
        </div>
      </Modal>
    );
  }
);
