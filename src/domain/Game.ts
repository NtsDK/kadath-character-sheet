import type { GameDataModel, GearItem } from "./GameDataModel";

export interface Game {
  // мета информация о конфигурации листа персонажа
  /** Уникальное название конфигурации - игровой линейки */
  name: string;
  /** Внутренний идентификатор конфигурации */
  id: string;
  /** Версия */
  version: number;

  /** Схема данных конфигурации */
  dataModel: GameDataModel;

  /** Макет листа персонажа  */
  layout: Layout;

  /** Предметы для игры */
  // gearItemCollections: GearItemCollection[];

  // /** Набор прегенерированных персонажей */
  // characterCollections: object[];
}

interface GearItemCollection {
  name: string;
  items: GearItem[];
}

type Layout = string[];
