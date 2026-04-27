import type { GameDataModel, GearItem } from "./GameDataModel";

export interface Game {
  // мета информация о конфигурации листа персонажа
  /** Уникальное название конфигурации - игровой линейки */
  name: string;
  /** Внутренний идентификатор конфигурации */
  id: string;
  /** Версия */
  // version: number;

  /** Модель данных */
  dataModel: GameDataModel;

  /** Макет листа персонажа  */
  layout: Layout;

  /** Предметы для игры */
  gearItemCollections: GearItemCollection[];

  /** Набор прегенерированных персонажей */
  characterCollections: object[];
}

export type GameMetaProps = "name" | "id";
export type GameContentProps = "dataModel" | "layout";
export type GameMeta = Pick<Game, GameMetaProps>;
export type GameContent = Omit<Game, GameContentProps>;
export type GameSupplemental = Omit<Game, GameMetaProps | GameContentProps>;

interface GearItemCollection {
  name: string;
  items: GearItem[];
}

type Layout = string[];
