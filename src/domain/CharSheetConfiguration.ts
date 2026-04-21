import type { ConfigurationDataModel, GearItem } from "./ConfigurationDataModel";

export interface CharSheetConfiguration {
  // мета информация о конфигурации листа персонажа
  /** Уникальное название конфигурации - игровой линейки */
  name: string;
  /** Внутренний идентификатор конфигурации */
  id: string;
  /** Версия файла, хэш модели данных */
  version: string;

  /** Схема данных конфигурации */
  dataModel: ConfigurationDataModel;

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
