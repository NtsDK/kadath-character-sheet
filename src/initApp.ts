import {
  ClaudiaCharSheet,
  ClaudiaCharSheet2,
  getNewDefinedCharSheet,
} from "./domainServices/charSheet";
import { getCharSheetEditorUiStore, getCharSheetStore } from "./IoC";

export function initApp() {
  const charSheetStore = getCharSheetStore();
  charSheetStore.add(ClaudiaCharSheet());
  charSheetStore.add(ClaudiaCharSheet2());
  charSheetStore.add(getNewDefinedCharSheet());

  const list = Object.values(charSheetStore.charSheets);
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  charSheetEditorUiStore.setId(list[0]?.id);
}
