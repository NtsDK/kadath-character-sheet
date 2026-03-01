import { inject, injectable } from "inversify";
import { action, makeObservable, observable, reaction } from "mobx";
import { notification as antNotification } from "antd";

import { NotificationStore } from "../domainServices/NotificationStore";
import { IOC_IDS } from "../IoC/Symbols";

@injectable()
export class NotificationModalUiStore {
  _isModalOpen = false;
  _lastNotificationId: string = "";

  constructor(
    @inject(IOC_IDS.NotificationStore)
    public readonly notificationStore: NotificationStore,
  ) {
    makeObservable(this, {
      _isModalOpen: observable,
      _lastNotificationId: observable,
      setIsModalOpen: action,
    });

    reaction(
      () => this.notificationStore.notifications.length,
      () => {
        this.showAntNotification();
      },
    );
  }

  get isModalOpen() {
    return this._isModalOpen;
  }

  setIsModalOpen(isOpen: boolean) {
    this._isModalOpen = isOpen;
  }

  private showAntNotification() {
    const { notifications } = this.notificationStore;

    const index = notifications.findIndex(
      ({ id }) => id === this._lastNotificationId,
    );

    const startIndex = index === -1 ? 0 : index + 1;
    for (let i = startIndex; i < notifications.length; i++) {
      const notification = notifications[i];
      antNotification.open({
        type: notification.type,
        message: notification.message,
        description: notification.description,
        duration: notification.duration,
        placement: "bottomRight",
      });
    }
    this._lastNotificationId = notifications.at(-1)?.id ?? "";
  }
}
