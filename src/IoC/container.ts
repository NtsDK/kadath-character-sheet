import { Container } from "inversify";

import { CatalogPageUiStore, ImportModalUiStore } from "../page.catalog";
import { ConfirmModalUiStore } from "../unitComponents/ConfirmModalUiStore";
import { CharSheetActionsUiStore , CharSheetEditorUiStore } from "../page.charSheet";
import { CharSheetStore , NotificationStore } from "../domainServices";
import { TempStorage , ExportManager , ImportManager } from "../infrastructure";
import { NotificationModalUiStore } from "../pages/NotificationModalUiStore";

import { IOC_IDS } from "./Symbols";

export const iocContainer = new Container();

export function initIoCContainer() {
  // domain services
  iocContainer.bind(IOC_IDS.CharSheetStore).to(CharSheetStore).inSingletonScope();
  iocContainer.bind(IOC_IDS.NotificationStore).to(NotificationStore).inSingletonScope();
  // Catalog page
  iocContainer.bind(IOC_IDS.CatalogPageUiStore).to(CatalogPageUiStore).inSingletonScope();
  iocContainer.bind(IOC_IDS.ImportModalUiStore).to(ImportModalUiStore).inSingletonScope();
  // CharSheet editor page
  iocContainer.bind(IOC_IDS.CharSheetActionsUiStore).to(CharSheetActionsUiStore).inSingletonScope();
  iocContainer.bind(IOC_IDS.CharSheetEditorUiStore).to(CharSheetEditorUiStore).inSingletonScope();
  // infrastructure
  iocContainer.bind(IOC_IDS.TempStorage).to(TempStorage).inSingletonScope();
  iocContainer.bind(IOC_IDS.ExportManager).to(ExportManager).inSingletonScope();
  iocContainer.bind(IOC_IDS.ImportManager).to(ImportManager).inSingletonScope();
  // other
  iocContainer.bind(IOC_IDS.ConfirmModalUiStore).to(ConfirmModalUiStore).inSingletonScope();
  iocContainer.bind(IOC_IDS.NotificationModalUiStore).to(NotificationModalUiStore).inSingletonScope();
}

