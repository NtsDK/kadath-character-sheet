import type {
  CharSheetActionsUiStore,
  CharSheetEditorUiStore,
} from "../page.charSheet";
import type { CharSheetStore } from "../domainServices/CharSheetStore";
import type { NotificationStore } from "../domainServices/NotificationStore";
import type { CatalogPageUiStore, ImportModalUiStore } from "../page.catalog";
import type { LibraryPageStore } from "../page.library";
import type { NotificationModalUiStore } from "../pages/NotificationModalUiStore";
import type { IExportManager, IImportManager, ITempStorage } from "../ports";
import type { ConfirmModalUiStore } from "../unitComponents/ConfirmModalUiStore";
import type { GameStore } from "../domainServices";
import type { GameCatalogPageUiStore } from "../page.gameCatalog";
import type { GameEditorUiStore } from "../page.game";

import { iocContainer } from "./container";
import { IOC_IDS } from "./Symbols";

export function getCatalogPageUiStore(): CatalogPageUiStore {
  return iocContainer.get<CatalogPageUiStore>(IOC_IDS.CatalogPageUiStore);
}

export function getLibraryPageStore(): LibraryPageStore {
  return iocContainer.get<LibraryPageStore>(IOC_IDS.LibraryPageStore);
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

export function getGameStore(): GameStore {
  return iocContainer.get<GameStore>(IOC_IDS.GameStore);
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

export function getImportModalUiStore(): ImportModalUiStore {
  return iocContainer.get<ImportModalUiStore>(IOC_IDS.ImportModalUiStore);
}

export function getGameCatalogPageUiStore(): GameCatalogPageUiStore {
  return iocContainer.get<GameCatalogPageUiStore>(
    IOC_IDS.GameCatalogPageUiStore,
  );
}

export function getGameEditorUiStore(): GameEditorUiStore {
  return iocContainer.get<GameEditorUiStore>(
    IOC_IDS.GameEditorUiStore,
  );
}
