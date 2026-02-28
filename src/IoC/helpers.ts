import { CharSheetActionsUiStore } from "../charSheetPage/CharSheetActionsUiStore";
import { CharSheetEditorUiStore } from "../charSheetPage/CharSheetEditorUiStore";
import { CharSheetStore } from "../domainServices/CharSheetStore";
import { NotificationStore } from "../domainServices/NotificationStore";
import { CatalogPageUiStore } from "../pages/CatalogPageUiStore";
import { NotificationModalUiStore } from "../pages/NotificationModalUiStore";
import { IExportManager, IImportManager, ITempStorage } from "../ports";
import { ConfirmModalUiStore } from "../unitComponents/ConfirmModalUiStore";

import { iocContainer } from "./container";
import { IOC_IDS } from "./Symbols";

export function getCatalogPageUiStore(): CatalogPageUiStore {
  return iocContainer.get<CatalogPageUiStore>(IOC_IDS.CatalogPageUiStore);
}

export function getConfirmModalUiStore(): ConfirmModalUiStore {
  return iocContainer.get<ConfirmModalUiStore>(IOC_IDS.ConfirmModalUiStore);
}

export function getCharSheetActionsUiStore(): CharSheetActionsUiStore {
  return iocContainer.get<CharSheetActionsUiStore>(
    IOC_IDS.CharSheetActionsUiStore,
  );
}

export function getCharSheetEditorUiStore(): CharSheetEditorUiStore {
  return iocContainer.get<CharSheetEditorUiStore>(
    IOC_IDS.CharSheetEditorUiStore,
  );
}

export function getCharSheetStore(): CharSheetStore {
  return iocContainer.get<CharSheetStore>(IOC_IDS.CharSheetStore);
}

export function getTempStorage(): ITempStorage {
  return iocContainer.get<ITempStorage>(IOC_IDS.TempStorage);
}

export function getExportManager(): IExportManager {
  return iocContainer.get<IExportManager>(IOC_IDS.ExportManager);
}

export function getImportManager(): IImportManager {
  return iocContainer.get<IImportManager>(IOC_IDS.ImportManager);
}

export function getNotificationModalUiStore(): NotificationModalUiStore {
  return iocContainer.get<NotificationModalUiStore>(
    IOC_IDS.NotificationModalUiStore,
  );
}

export function getNotificationStore(): NotificationStore {
  return iocContainer.get<NotificationStore>(IOC_IDS.NotificationStore);
}
