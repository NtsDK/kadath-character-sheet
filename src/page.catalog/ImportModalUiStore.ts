import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class ImportModalUiStore {
  _isModalOpen = false;

  constructor() {
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
