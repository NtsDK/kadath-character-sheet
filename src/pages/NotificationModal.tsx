import { Alert, Modal } from "antd";
import { observer } from "mobx-react-lite";

import { getNotificationModalUiStore, getNotificationStore } from "../IoC";
import { simpleDateFormat } from "../utils/simpleDateFormat";

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
      <div className="tw-max-h-80 tw-overflow-auto">
        {notificationStore.notifications.map((notification) => (
          <Alert
            key={notification.id}
            className="tw-mb-4 tw-py-3 tw-px-4"
            type={notification.type}
            message={notification.message}
            description={
              <>
                <div>{notification.description}</div>
                <div className="tw-text-xs tw-text-gray-600 tw-mt-2">{simpleDateFormat(notification.date)}</div>
              </>
            }
            showIcon
          />
        ))}
      </div>
    </Modal>
  );
});
