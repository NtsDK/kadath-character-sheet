import { action, makeObservable, observable } from "mobx";
import { injectable } from "inversify";
import { v4 as uuid } from "uuid";

import { KNotification, NotificationCommand } from "../domain/Notification";


const defaultNotification: Pick<NotificationCommand, "duration"> = {
  duration: 5,
};

@injectable()
export class NotificationStore {
  _notifications: KNotification[] = [
  ];

  constructor() {
    makeObservable(this, {
      _notifications: observable,
      notify: action,
      clearNotifications: action,
    });
  }

  get notifications(): KNotification[] {
    return this._notifications;
  }

  notify(notification: NotificationCommand) {
    const defaultShowInNotificationModal =
      notification.type === "error" || notification.type === "warning";
    this._notifications.push({
      ...defaultNotification,
      showInNotificationModal: defaultShowInNotificationModal,
      ...notification,
      id: uuid(),
      date: new Date(),
    });
  }

  clearNotifications() {
    this._notifications = [];
  }
}
