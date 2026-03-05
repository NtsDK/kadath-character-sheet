import { getCharSheetEditorUiStore, getCharSheetStore, getTempStorage } from "./IoC";
import { initIoCContainer } from "./IoC/container";

export async function initApp() {

  initIoCContainer();

  const tempStorage = getTempStorage();
  await tempStorage.init();
  const charSheets = await tempStorage.getAllCharSheets();
  const charSheetStore = getCharSheetStore();
  charSheetStore.init(charSheets);

  const list = Object.values(charSheetStore.charSheets);
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  charSheetEditorUiStore.setId(list[0]?.id);
}
