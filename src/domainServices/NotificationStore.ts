import { action, makeObservable, observable } from "mobx";
import { injectable } from "inversify";

import { KNotification } from "../domain/KNotification";


const defaultNotification: Pick<KNotification, "duration"> = {
  duration: 5000,
};

@injectable()
export class NotificationStore {
  _notifications: KNotification[] = [
    {
      type: "info",
      message: "Welcome to Kadath Character Sheet!",
      description:
        "This is a tool to create and manage your character sheets for the Kadath RPG.",
      duration: 10_000,
      showInNotificationModal: true,
    },
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

  notify(notification: KNotification) {
    const defaultShowInNotificationModal =
      notification.type === "error" || notification.type === "warning";
    this._notifications.push({
      ...defaultNotification,
      showInNotificationModal: defaultShowInNotificationModal,
      ...notification,
    });
  }

  clearNotifications() {
    this._notifications = [];
  }
}
