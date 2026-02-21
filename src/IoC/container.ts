import { Container } from "inversify";
import { IOC_IDS } from "./Symbols";
import { CatalogPageUiStore } from "../pages/CatalogPageUiStore";
import { ConfirmModalUiStore } from "../unitComponents/ConfirmModalUiStore";
import { CharSheetActionsUiStore } from "../charSheetPage/CharSheetActionsUiStore";
import { CharSheetEditorUiStore } from "../charSheetPage/CharSheetEditorUiStore";
import { CharSheetStore } from "../domainServices/CharSheetStore";

export const iocContainer = new Container();

iocContainer.bind(IOC_IDS.CatalogPageUiStore).to(CatalogPageUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.ConfirmModalUiStore).to(ConfirmModalUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.CharSheetActionsUiStore).to(CharSheetActionsUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.CharSheetEditorUiStore).to(CharSheetEditorUiStore).inSingletonScope();
iocContainer.bind(IOC_IDS.CharSheetStore).to(CharSheetStore).inSingletonScope();
