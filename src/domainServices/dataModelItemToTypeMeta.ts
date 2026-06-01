import type { DataModelItem, TypeMeta } from "../domain/GameDataModel";

export function dataModelItemToTypeMeta(dataModelItem: DataModelItem): TypeMeta {
  if (dataModelItem.type === "list") {
    return {
      type: "list",
      proto: dataModelItem.proto.type,
    };
  }
  return {
    type: dataModelItem.type,
  };
}
