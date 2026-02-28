import { Container } from "inversify";

import { CatalogPageUiStore } from "../pages/CatalogPageUiStore";
import { ConfirmModalUiStore } from "../unitComponents/ConfirmModalUiStore";
import { CharSheetActionsUiStore } from "../charSheetPage/CharSheetActionsUiStore";
import { CharSheetEditorUiStore } from "../charSheetPage/CharSheetEditorUiStore";
import { CharSheetStore } from "../domainServices/CharSheetStore";
import { TempStorage } from "../infrastructure/TempStorage";
import { ExportManager } from "../infrastructure/ExportManager";
import { ImportManager } from "../infrastructure/ImportManager";
import { NotificationStore } from "../domainServices/NotificationStore";
import { NotificationModalUiStore } from "../pages/NotificationModalUiStore";

import { IOC_IDS } from "./Symbols";

export const iocContainer = new Container();

iocContainer.bind(IOC_IDS.CatalogPageUiStore).to(CatalogPageUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.ConfirmModalUiStore).to(ConfirmModalUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.CharSheetActionsUiStore).to(CharSheetActionsUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.CharSheetEditorUiStore).to(CharSheetEditorUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.CharSheetStore).to(CharSheetStore).inSingletonScope();
iocContainer.bind(IOC_IDS.TempStorage).to(TempStorage).inSingletonScope();
iocContainer.bind(IOC_IDS.ExportManager).to(ExportManager).inSingletonScope();
iocContainer.bind(IOC_IDS.ImportManager).to(ImportManager).inSingletonScope();
iocContainer.bind(IOC_IDS.NotificationModalUiStore).to(NotificationModalUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.NotificationStore).to(NotificationStore).inSingletonScope();
