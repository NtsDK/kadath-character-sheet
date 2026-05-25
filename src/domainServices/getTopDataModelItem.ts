import type { TopDataModelItem, TypeMeta } from "../domain/GameDataModel";

export function getTopDataModelItem(
  name: string,
  title: string,
  typeMeta: TypeMeta,
): TopDataModelItem {
  if (typeMeta.type === "characterCondition") {
    return {
      type: "characterCondition",
      name,
      title,
      isInjury: false,
      label: "",
      value: 1,
    };
  }

  throw new Error(`Unsupported type: ${JSON.stringify(typeMeta)}`);
}
