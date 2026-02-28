import { observer } from "mobx-react-lite";
import { Modal } from "antd";

import { getConfirmModalUiStore } from "../IoC";

export const ConfirmModal = observer(() => {
  const confirmModalUiStore = getConfirmModalUiStore();
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
