import { CharSheet } from "../domain/CharSheet";
import * as R from "ramda";
import { v4 as uuid } from "uuid";
import { VERSION } from "../constants";

export function getNewCharSheet(): CharSheet {
  return {
    name: "",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    // characterName: "",
    // playerName: "",
    powers: [],
    dreamlandPowers: [],
    weakness: { name: "", value: 1 },
    recollections: [],
    temporalConditions: [],
    mentalConditions: [],
    bodyWounds: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "",
  };
}

export function ClaudiaCharSheet(): CharSheet {
  return {
    name: "Клодия",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    // characterName: "Клодия",
    // playerName: "",
    powers: [
      {
        name: "Внимание к деталям",
        value: 2,
      },
      {
        name: "Впечатляющий интеллект",
        value: 1,
      },
      { name: "Ловкая упырица", value: 2 },
      { name: "Мастерица запугивания", value: 1 },
      {
        name: "Мощные когти и острые зубы",
        value: 1,
      },
      {
        name: "Невероятная эрудиция",
        value: 1,
      },
      {
        name: "Расчёт вероятностей",
        value: 2,
      },
      {
        name: "Сверхъестественное обоняние",
        value: 1,
      },
      { name: "Стратег и и тактик", value: 1 },
      { name: "Хлёсткие речи", value: 1 },
    ],
    dreamlandPowers: [],
    weakness: { name: "Перфекционизм", value: 1 },
    recollections: [],
    temporalConditions: [],
    mentalConditions: [],
    bodyWounds: [],
    luck: 0,
    items: [
      {
        name: "Сумка с разными лакомствами в дорогу 2",
        currentStrength: 4,
        maxStrength: 4,
        powers: ["Глинтвейн с силой домашнего очага 1"],
      },
      {
        name: "Тёплая и практичная одежда 2",
        currentStrength: 3,
        maxStrength: 3,
        powers: [],
      },
      {
        name: "Яркий фонарь 1",
        currentStrength: 2,
        maxStrength: 2,
        powers: [],
      },
    ],
    projects: [],
    notes: "Упырица, амбициозная смотрительница музея.",
  };
}
export function ClaudiaCharSheet2(): CharSheet {
  return {
    name: "Клодия 2",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    // characterName: "Клодия",
    // playerName: "",
    powers: [
      {
        name: "Внимание к деталям",
        value: 2,
      },
      {
        name: "Впечатляющий интеллект",
        value: 1,
      },
      { name: "Ловкая упырица", value: 2 },
      { name: "Мастерица запугивания", value: 1 },
      {
        name: "Мощные когти и острые зубы",
        value: 1,
      },
      {
        name: "Невероятная эрудиция",
        value: 1,
      },
      {
        name: "Расчёт вероятностей",
        value: 2,
      },
      {
        name: "Сверхъестественное обоняние",
        value: 1,
      },
      { name: "Стратег и и тактик", value: 1 },
      { name: "Хлёсткие речи", value: 1 },
    ],
    dreamlandPowers: [
      {
        name: "Dreamland Power 1",
        value: 2,
      },
    ],
    weakness: { name: "Перфекционизм", value: 2 },
    recollections: [
      {
        name: "Recollection 1",
        value: 2,
      },
    ],
    temporalConditions: [
      {
        name: "Отборные ингредиенты",
        value: 2,
      },
    ],
    mentalConditions: [
      {
        name: "Воодушевлён",
        value: 3,
        isInjury: false,
      },
      {
        name: "Испуган",
        value: -3,
        isInjury: false,
      },
      {
        name: "Унижен",
        value: -1,
        isInjury: false,
      },
    ],
    bodyWounds: [
      {
        name: "Вывихнутая нога",
        value: -2,
        isInjury: false,
      },
    ],
    luck: 4,
    items: [
      {
        name: "Сумка с разными лакомствами в дорогу 2",
        currentStrength: 4,
        maxStrength: 4,
        powers: [],
      },
      {
        name: "Тёплая и практичная одежда 2",
        currentStrength: 3,
        maxStrength: 3,
        powers: [],
      },
      {
        name: "Яркий фонарь 1",
        currentStrength: 2,
        maxStrength: 2,
        powers: [],
      },
    ],
    projects: [
      {
        name: "Построить идеальную коллекцию для музея",
        progress: 2,
        successThreshold: 5,
        description:
          "Клодия стремится собрать уникальные и ценные экспонаты для своего музея, чтобы привлечь посетителей и стать известной в мире коллекционеров.",
      },
    ],
    notes: "Упырица, амбициозная смотрительница музея.",
  };
}

export function getNewDefinedCharSheet(): CharSheet {
  return {
    name: "characterName playerName",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    // characterName: "characterName",
    // playerName: "playerName",
    powers: cloneToArr({ name: "power1", value: 1 }, 15),
    dreamlandPowers: cloneToArr({ name: "dreamlandPower1", value: 1 }, 3),
    weakness: { name: "weakness", value: 1 },
    recollections: cloneToArr({ name: "recollection1", value: 1 }, 3),
    mentalConditions: cloneToArr(
      { name: "mentalCondition1", value: 1, isInjury: false },
      3,
    ),
    bodyWounds: cloneToArr(
      { name: "bodyWound1", value: 1, isInjury: false },
      6,
    ),
    temporalConditions: cloneToArr({ name: "temporalCondition1", value: 1 }, 5),
    luck: 3,
    items: cloneToArr({
      name: "item 1",
      currentStrength: 1,
      maxStrength: 1,
      powers: [],
    }, 5),
    projects: [
      {
        name: "project1",
        progress: 2,
        successThreshold: 5,
        description: "description of project1",
      },
    ],
    notes: "notes",
  };
}

function cloneToArr<T>(el: T, count: number): T[] {
  return R.repeat<T>(el, count).map(R.clone<T>);
}
