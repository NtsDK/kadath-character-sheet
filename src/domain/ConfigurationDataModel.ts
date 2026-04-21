interface TopNameableItem {
  name: string;
  title: string;
}

// Primitive items

interface StringItem {
  type: "string";
  value: string;
}

interface NumberItem {
  type: "number";
  value: number;
  min?: number;
  max?: number;
}

interface LabeledNumberItem {
  type: "labeledNumber";
  value: number;
  label: string;
  min?: number;
  max?: number;
}

interface CharacterCondition {
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
interface ProjectItem {
  type: "project";
  label: string;
  progress: number;
  successThreshold: number;
  description: string;
}

type PrimitiveItem =
  | StringItem
  | NumberItem
  | LabeledNumberItem
  | CharacterCondition
  | GearItem
  | ProjectItem;

// Composite items
interface ListItem {
  type: "list";
  initialLength?: number;
  maxLength?: number;
  proto: PrimitiveItem;
}

// Collected types
type DataModelItem = PrimitiveItem | ListItem;

export type ConfigurationDataModel = (DataModelItem & TopNameableItem)[];
