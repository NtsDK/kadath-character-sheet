export interface CharSheet {
  // мета информация о листе персонажа
  /** Уникальное название файла, имя персонажа + игрока */
  name: string;
  /** Тип листа персонажа, ожидаются другие виды листов в будущем */
  type: "char-sheet/beyond-the-gates";
  /** Идентификатор файла, используется в памяти, но не в экспортных архивах */
  id: string;

  content: {
    /** Имя персонажа */
    // characterName: string;
    // /** Имя игрока */
    // playerName: string;
    /** Силы, до 15 единиц */
    powers: Power[];
    /** Силы Мира Грёз, до 3 единиц */
    dreamlandPowers: Power[];
    /** Слабость */
    weakness: Weakness;
    /** Воспоминания, до 3 единиц */
    recollections: Recollection[];
    /** Душевные раны и силы, до 3 единиц */
    mentalConditions: MentalCondition[];
    /** Телесные раны, до 6 единиц */
    bodyWounds: BodyWound[];
    /** Трудности и преимущества */
    temporalConditions: TemporalCondition[];
    /** Кубики удачи, макс. 12 */
    luck: number;
    /** Предметы снаряжения */
    items: string[];
    /** Заметки */
    notes: string;
  };
}

export type CharSheetContent = CharSheet["content"];

// Описание предмета
// - название + ступень силы
// - прочность
// - предел прочности = floor(прочность / 2)
// - исходная прочность
// - 1-2 силы + ступень силы (если есть)

export interface Power {
  name: string;
  value: number;
}

export interface Weakness {
  name: string;
  value: number;
}

export interface Recollection {
  name: string;
  value: number;
}

export interface TemporalCondition {
  name: string;
  value: number;
}

export interface MentalCondition {
  name: string;
  value: number;
  isInjury: boolean;
}

export interface BodyWound {
  name: string;
  value: number;
  isInjury: boolean;
}

export type CharacterCondition = MentalCondition | BodyWound;
