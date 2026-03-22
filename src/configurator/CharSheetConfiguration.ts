import type { DataModel, GearItem } from "./dataModelTypes";

export interface CharSheetConfiguration {
  // мета информация о конфигурации листа персонажа
  /** Уникальное название файла, имя персонажа + игрока */
  name: string;
  /** Ключ типа листа персонажа, внутренний идентификатор конфигурации */
  typeKey: string;
  /** Идентификатор файла */
  id: string;
  /** Дата последнего обновления файла */
  // updatedAt: Date;
  /** Версия файла, хэш модели данных */
  version: string;

  dataModel: DataModel;

  layout: Layout;

  gearItemCollections: GearItemCollection[];

  characterCollections: object[];
}

interface GearItemCollection {
  name: string;
  items: GearItem[];
}

type Layout = string[];
