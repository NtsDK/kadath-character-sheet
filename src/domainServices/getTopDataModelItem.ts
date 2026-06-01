import type {
  PrimitiveItem,
  TopDataModelItem,
  TypeMeta,
} from "../domain/GameDataModel";

export function getTopDataModelItem(
  name: string,
  title: string,
  typeMeta: TypeMeta,
): TopDataModelItem {
  if (typeMeta.type === "list") {
    const protoItem = getPrimitiveModelItem(typeMeta.proto);
    return {
      type: "list",
      name,
      title,
      initialLength: 3,
      proto: protoItem,
    };
  } else {
    const item = getPrimitiveModelItem(typeMeta.type);
    return {
      name,
      title,
      ...item,
    };
  }

  throw new Error(`Unsupported type: ${JSON.stringify(typeMeta)}`);
}

function getPrimitiveModelItem(type: PrimitiveItem["type"]): PrimitiveItem {
  if (type === "string") {
    return {
      type: "string",
      value: "",
    };
  }
  if (type === "project") {
    return {
      type: "project",
      label: "",
      progress: 0,
      successThreshold: 0,
      description: "",
    };
  }
  if (type === "number") {
    return {
      type: "number",
      value: 0,
      min: 0,
      max: 5,
    };
  }
  if (type === "labeledNumber") {
    return {
      type: "labeledNumber",
      label: "",
      value: 1,
    };
  }
  if (type === "labeledNumberInRange") {
    return {
      type: "labeledNumberInRange",
      label: "",
      value: 1,
      min: 1,
      max: 3,
    };
  }
  if (type === "gearItem") {
    return {
      type: "gearItem",
      label: "",
      currentStrength: 1,
      maxStrength: 1,
      powers: [],
    };
  }
  if (type === "characterCondition") {
    return {
      type: "characterCondition",
      isInjury: false,
      label: "",
      value: 1,
    };
  }

  throw new Error(`Unsupported type: ${JSON.stringify(type)}`);
}
