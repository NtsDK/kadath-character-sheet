interface TopNameableItem {
  id: string;
  name: string;
}

// Primitive items

export interface StringItem {
  type: "string";
  value: string;
}

export interface NumberItem {
  type: "number";
  value: number;
  min: number;
  max: number;
}

export interface LabeledNumberItem {
  type: "labeledNumber";
  value: number;
  label: string;
}

export interface LabeledNumberInRangeItem {
  type: "labeledNumberInRange";
  value: number;
  label: string;
  min: number;
  max: number;
}

export interface CharacterCondition {
  type: "characterCondition";
  label: string;
  value: number;
  isInjury: boolean;
}
export interface GearItem {
  type: "gearItem";
  label: string;
  currentStrength: number;
  maxStrength: number;
  powers: string[];
}
export interface ProjectItem {
  type: "project";
  label: string;
  progress: number;
  successThreshold: number;
  description: string;
}

export type PrimitiveItem =
  | StringItem
  | NumberItem
  | LabeledNumberItem
  | LabeledNumberInRangeItem
  | CharacterCondition
  | GearItem
  | ProjectItem;

// Composite items
export interface ListItem {
  type: "list";
  initialLength: number;
  maxLength?: number;
  proto: PrimitiveItem;
}

// Collected types
export type DataModelItem = PrimitiveItem | ListItem;

export type TopDataModelItem = DataModelItem & TopNameableItem;

export type GameDataModel = TopDataModelItem[];

export type TypeMeta =
  | {
      type: PrimitiveItem["type"];
    }
  | {
      type: ListItem["type"];
      proto: PrimitiveItem["type"];
    };
