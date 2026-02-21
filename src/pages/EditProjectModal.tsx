import { Form, Input, InputNumber, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Project } from "../domain/CharSheet";

type Props = {
  title?: string;
  isModalOpen: boolean;
  handleOk: (project: Project) => void;
  validateName?: (name: string) => string | null;
  handleCancel: () => void;
  defaultProject?: Project;
};

export const EditProjectModal = observer(
  ({ title, isModalOpen, handleCancel, handleOk, defaultProject }: Props) => {
    const [name, setName] = useState(defaultProject?.name ?? "");
    const [description, setDescription] = useState(
      defaultProject?.description ?? ""
    );
    const [progress, setProgress] = useState(defaultProject?.progress ?? 0);
    const [successThreshold, setSuccessThreshold] = useState(
      defaultProject?.successThreshold ?? 0
    );

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
      setName(event.target.value);
    }

    function onChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
      setDescription(event.target.value);
    }

    function onChangeProgress(value: number | null) {
      setProgress(value ?? 0);
    }

    function onChangeSuccessThreshold(value: number | null) {
      setSuccessThreshold(value ?? 0);
    }

    function onOk() {
      handleOk({ name, description, progress, successThreshold });
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
        <Form labelCol={{ span: 6 }}>
          <Form.Item label="Название">
            <Input
              placeholder="Введите название замысла"
              value={name}
              onChange={onChangeName}
            />
          </Form.Item>
          <Form.Item label="Описание">
            <Input
              placeholder="Введите описание замысла"
              value={description}
              onChange={onChangeDescription}
            />
          </Form.Item>
          <Form.Item label="Прогресс">
            <InputNumber min={0} value={progress} onChange={onChangeProgress} />
          </Form.Item>
          <Form.Item label="Размах">
            <InputNumber
              min={0}
              value={successThreshold}
              onChange={onChangeSuccessThreshold}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
