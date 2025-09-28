export interface CharSheet {
  /** Имя персонажа */
  characterName: string;
  /** Имя игрока */
  playerName: string;
  /** Силы, до 15 единиц */
  powers: Power[];
  /** Силы Мира Грёз, до 3 единиц */
  dreamlandPowers: Power[];
  /** Слабость */
  weakness: Weakness;
  /** Воспоминания */
  recollections: Recollection[];
  /** Трудности и преимущества */
  temporalConditions: TemporalCondition[];
  /** Душевные раны и силы, до 3 единиц */
  mentalConditions: MentalCondition[];
  /** Телесные раны, до 6 единиц */
  bodyWounds: BodyWound[];
  /** Кубики удачи, макс. 12 */
  luck: number;
}



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
