import { getCharSheetEditorUiStore, getCharSheetStore, getLibraryPageStore, getTempStorage } from "./IoC";
import { initIoCContainer } from "./IoC/container";

export async function initApp() {

  initIoCContainer();

  const tempStorage = getTempStorage();
  await tempStorage.init();
  const charSheets = await tempStorage.getAllCharSheets();

  const charSheetStore = getCharSheetStore();
  charSheetStore.init(charSheets);
  // if (charSheets.length === 0) {
  //   const libraryPageStore = getLibraryPageStore();
  //   libraryPageStore.createCharacter("beyond-the-gates/Claudia", false);
  //   libraryPageStore.createCharacter("beyond-the-gates/test_char_sheet", false);
  //   libraryPageStore.createCharacter("beyond-the-gates/Claudia_test", false);
  // }

  const list = Object.values(charSheetStore.charSheets);
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  charSheetEditorUiStore.setId(list[0]?.id);
}
