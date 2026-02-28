import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { NotificationStore } from "../domainServices/NotificationStore";
import { IOC_IDS } from "../IoC/Symbols";

@injectable()
export class NotificationModalUiStore {
  _isModalOpen = false;

  constructor(
    @inject(IOC_IDS.NotificationStore)
    public readonly notificationStore: NotificationStore,
  ) {
    makeObservable(this, {
      _isModalOpen: observable,
      setIsModalOpen: action,
    });
  }

  get isModalOpen() {
    return this._isModalOpen;
  }

  setIsModalOpen(isOpen: boolean) {
    this._isModalOpen = isOpen;
  }
}
