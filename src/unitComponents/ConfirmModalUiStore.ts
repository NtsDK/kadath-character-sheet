import { injectable } from "inversify";
import { action, computed, makeObservable, observable } from "mobx";

type ConfirmModalStatus =
  | {
      type: "close";
    }
  | {
      type: "open";
      message: string;
      onConfirm: () => void;
    };

@injectable()
export class ConfirmModalUiStore {
  _status: ConfirmModalStatus = { type: "close" };

  constructor() {
    makeObservable(this, {
      _status: observable,
      status: computed,
      confirm: action,
      close: action,
    });
  }

  get status(): ConfirmModalStatus {
    return this._status;
  }

  confirm(message: string, onConfirm: () => void) {
    this._status = {
      type: "open",
      message,
      onConfirm: () => {
        onConfirm();
        this.close();
      },
    };
  }

  close() {
    this._status = { type: "close" };
  }
}
