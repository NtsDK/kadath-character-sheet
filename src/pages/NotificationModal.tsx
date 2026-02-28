import { Modal } from "antd";
import { observer } from "mobx-react-lite";

import { getNotificationModalUiStore, getNotificationStore } from "../IoC";

export const NotificationModal = observer(() => {
  const notificationModalUiStore = getNotificationModalUiStore();
  const notificationStore = getNotificationStore();
  return (
    <Modal
      title="Центр уведомлений"
      open={notificationModalUiStore.isModalOpen}
      onCancel={() => notificationModalUiStore.setIsModalOpen(false)}
      footer={null}
    >
      {JSON.stringify(notificationStore.notifications, null, 2)}
    </Modal>
  );
});
