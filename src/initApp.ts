import { getCharSheetEditorUiStore, getCharSheetStore, getTempStorage } from "./IoC";

export async function initApp() {

  const tempStorage = getTempStorage();
  await tempStorage.init();
  const charSheets = await tempStorage.getAllCharSheets();
  const charSheetStore = getCharSheetStore();
  charSheetStore.init(charSheets);

  const list = Object.values(charSheetStore.charSheets);
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  charSheetEditorUiStore.setId(list[0]?.id);
}
