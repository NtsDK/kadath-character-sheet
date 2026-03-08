import * as R from "ramda";
import { v4 as uuid } from "uuid";

import type { CharSheet } from "../domain/CharSheet";
import { VERSION } from "../constants";

export const BEYOND_THE_GATE_CHARACTERS = [
  "beyond-the-gates/EnochWhately",
  "beyond-the-gates/SaoirseOMalley",
  "beyond-the-gates/ReggieTillinghast",
  "beyond-the-gates/JJOrne",
  "beyond-the-gates/DelilahWaite",
  "beyond-the-gates/GlennFitzpatrick",
  "beyond-the-gates/Claudia",
] as const;

export type BeyondTheGateCharacters =
  (typeof BEYOND_THE_GATE_CHARACTERS)[number];

export const beyondTheGatesMainChars: Record<
  BeyondTheGateCharacters,
  () => CharSheet
> = {
  "beyond-the-gates/EnochWhately": EnochWhatelyCharSheet,
  "beyond-the-gates/Claudia": ClaudiaCharSheet,
  "beyond-the-gates/DelilahWaite": DelilahWaiteCharSheet,
  "beyond-the-gates/GlennFitzpatrick": GlennFitzpatrickCharSheet,
  "beyond-the-gates/JJOrne": JJOrneCharSheet,
  "beyond-the-gates/ReggieTillinghast": ReggieTillinghastCharSheet,
  "beyond-the-gates/SaoirseOMalley": SaoirseOMalleyCharSheet,
};

export const beyondTheGatesTestChars: Record<string, () => CharSheet> = {
  "beyond-the-gates/test_char_sheet": getNewDefinedCharSheet,
  "beyond-the-gates/Claudia_test": ClaudiaCharSheet2,
};

export const beyondTheGatesAllChars: Record<string, () => CharSheet> = {
  ...beyondTheGatesMainChars,
  ...beyondTheGatesTestChars,
};

export function EnochWhatelyCharSheet(): CharSheet {
  return {
    name: "Энох Уотли",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    powers: [
      {
        name: "Ветеран кабацких драк",
        value: 1,
      },
      {
        name: "Волшебное зрение",
        value: 1,
      },
      {
        name: "Дьявольское обаяние",
        value: 2,
      },
      {
        name: "Житейская мудрость",
        value: 2,
      },
      {
        name: "Мощный удар",
        value: 1,
      },
      {
        name: "Невероятная сила",
        value: 1,
      },
      {
        name: "Талантливый знахарь",
        value: 1,
      },
      {
        name: "Умелый зельевар",
        value: 2,
      },
      {
        name: "Хорошо подвешенный язык",
        value: 1,
      },
      {
        name: "Широкий кругозор",
        value: 1,
      },
    ],
    dreamlandPowers: [],
    weakness: { name: "Дурной характер", value: 1 },
    recollections: [],
    mentalConditions: [],
    bodyWounds: [],
    temporalConditions: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "Хозяин заведения, которое работает навынос",
  };
}

export function SaoirseOMalleyCharSheet(): CharSheet {
  return {
    name: "Сирша О'Мэлли",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    powers: [
      {
        name: "Ведьмовские обряды",
        value: 1,
      },
      {
        name: "Верховная жрица Бригитты",
        value: 2,
      },
      {
        name: "Грация и изящество",
        value: 1,
      },
      {
        name: "Дар убеждения",
        value: 1,
      },
      {
        name: "Дивный голос",
        value: 1,
      },
      {
        name: "Зажигательные речи",
        value: 2,
      },
      {
        name: "Идеальный музыкальный слух",
        value: 1,
      },
      {
        name: "Красивые слова",
        value: 1,
      },
      {
        name: "Талант к танцам",
        value: 1,
      },
      {
        name: "Харизматичная ведьма",
        value: 2,
      },
    ],
    dreamlandPowers: [],
    weakness: { name: "Вспыльчивость", value: 1 },
    recollections: [],
    mentalConditions: [],
    bodyWounds: [],
    temporalConditions: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "Служительница Бригитты",
  };
}
export function ReggieTillinghastCharSheet(): CharSheet {
  return {
    name: "Реджи Тиллингаст",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    powers: [
      {
        name: "Безумный учёный",
        value: 2,
      },
      {
        name: "Впечатляющее остроумие",
        value: 1,
      },
      {
        name: "Деловая хватка",
        value: 2,
      },
      {
        name: "Деятельный экспериментатор",
        value: 2,
      },
      {
        name: "Золотые руки",
        value: 1,
      },
      {
        name: "Игра словами",
        value: 1,
      },
      {
        name: "Нестандартное мышление",
        value: 1,
      },
      {
        name: "Обаятельный пройдоха",
        value: 1,
      },
      {
        name: "Оккультные знания",
        value: 1,
      },
      {
        name: "Практикующий изобретатель",
        value: 1,
      },
    ],
    dreamlandPowers: [],
    weakness: { name: "Жажда признания", value: 1 },
    recollections: [],
    mentalConditions: [],
    bodyWounds: [],
    temporalConditions: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "Изобретатель и бизнесмен",
  };
}

export function JJOrneCharSheet(): CharSheet {
  return {
    name: "Джей-Джей Орн",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    powers: [
      {
        name: "Быстрая реакция",
        value: 1,
      },
      {
        name: "Впечатляющая эрудиция",
        value: 1,
      },
      {
        name: "Ловкий и быстроногий",
        value: 1,
      },
      {
        name: "Мастер слова",
        value: 2,
      },
      {
        name: "Невероятное везение",
        value: 2,
      },
      {
        name: "Поразительная проницательность",
        value: 1,
      },
      {
        name: "Потустороннее зрение",
        value: 1,
      },
      {
        name: "Пронырливый журналист",
        value: 2,
      },
      {
        name: "Профессиональное хитроумие",
        value: 1,
      },
      {
        name: "Шестое чувство",
        value: 1,
      },
    ],
    dreamlandPowers: [],
    weakness: { name: "Безрассудство", value: 1 },
    recollections: [],
    mentalConditions: [],
    bodyWounds: [],
    temporalConditions: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "Гонзо-журналист от мистики",
  };
}

export function DelilahWaiteCharSheet(): CharSheet {
  return {
    name: "Делайла Уэйт",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    powers: [
      {
        name: "Верховная жрица Гекаты",
        value: 2,
      },
      {
        name: "Глава Исторического общества",
        value: 1,
      },
      {
        name: "Древняя магия",
        value: 2,
      },
      {
        name: "Опытная путешественница",
        value: 1,
      },
      {
        name: "Познания в медицине",
        value: 1,
      },
      {
        name: "Потустороннее обаяние",
        value: 1,
      },
      {
        name: "Разнообразные мистические обряды",
        value: 2,
      },
      {
        name: "Талантливый археолог",
        value: 1,
      },
      {
        name: "Умение постоять за себя",
        value: 1,
      },
      {
        name: "Харизматичный лидер",
        value: 1,
      },
    ],
    dreamlandPowers: [],
    weakness: { name: "Высокомерие", value: 1 },
    recollections: [],
    mentalConditions: [],
    bodyWounds: [],
    temporalConditions: [],
    luck: 0,
    items: [],
    projects: [],
    notes:
      "Председательница Исторического общества Аркхема и верховная жрица Гекаты.",
  };
}
export function GlennFitzpatrickCharSheet(): CharSheet {
  return {
    name: "Гленн Фицпатрик",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,

    powers: [
      {
        name: "Академическое красноречие",
        value: 1,
      },
      {
        name: "Вдохновенный художник",
        value: 2,
      },
      {
        name: "Знаток мифов и легенд",
        value: 2,
      },
      {
        name: "Оккультные знания",
        value: 1,
      },
      {
        name: "Основы исторического фехтования",
        value: 1,
      },
      {
        name: "Познания в древней истории",
        value: 1,
      },
      {
        name: "Творческая натура",
        value: 2,
      },
      {
        name: "Упорство и трудолюбие",
        value: 1,
      },
      {
        name: "Хорошая физическая форма",
        value: 1,
      },
      {
        name: "Член Общества Святого Дунстана",
        value: 1,
      },
    ],
    dreamlandPowers: [],
    weakness: { name: "Стремление к справедливости", value: 1 },
    recollections: [],
    mentalConditions: [],
    bodyWounds: [],
    temporalConditions: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "Представитель Общества Святого Дунстана.",
  };
}

export function ClaudiaCharSheet(): CharSheet {
  return {
    name: "Клодия",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
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
      { name: "Стратег и тактик", value: 1 },
      { name: "Хлёсткие речи", value: 1 },
    ],
    dreamlandPowers: [],
    weakness: { name: "Перфекционизм", value: 1 },
    recollections: [],
    temporalConditions: [],
    mentalConditions: [],
    bodyWounds: [],
    luck: 0,
    items: [],
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
      { name: "Стратег и тактик", value: 1 },
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
    items: cloneToArr(
      {
        name: "item 1",
        currentStrength: 1,
        maxStrength: 1,
        powers: [],
      },
      5,
    ),
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
  return R.repeat<T>(el, count).map((x) => R.clone(x));
}
