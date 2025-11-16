import { observer } from "mobx-react-lite";
import { confirmModalUiStore } from "./ConfirmModalUiStore";
import { Modal } from "antd";

export const ConfirmModal = observer(() => {
  const { status } = confirmModalUiStore;

  if (status.type === "close") {
    return null;
  }

  const { message, onConfirm } = status;

  return (
    <Modal
      title="Подтверждение"
      open={true}
      onOk={onConfirm}
      onCancel={() => confirmModalUiStore.close()}
      cancelText="Отмена"
      okText="ОК"
    >
      <div>{message}</div>
    </Modal>
  );
});
