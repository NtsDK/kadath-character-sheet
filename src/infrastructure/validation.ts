import Ajv, { JSONSchemaType } from "ajv";
import * as R from "ramda";

import { Item, MentalCondition, Power, Project } from "../domain/CharSheet";

import { CharSheetDTO, Manifest } from "./types";

// import { Manifest } from "./types";

const ajv = new Ajv({
  allErrors: true,
  // removeAdditional: true,
  // useDefaults: true
});

export const manifestSchema: JSONSchemaType<Manifest> = {
  type: "object",
  properties: {
    version: { type: "string" },
  },
  required: ["version"],
  additionalProperties: false,
};

export const validateManifest = ajv.compile(manifestSchema);

const powerSchema: JSONSchemaType<Power> = {
  type: "object",
  properties: {
    name: { type: "string" },
    value: { type: "number" },
  },
  required: ["name", "value"],
  additionalProperties: false,
};

const mentalConditionSchema: JSONSchemaType<MentalCondition> = {
  type: "object",
  properties: {
    name: { type: "string" },
    value: { type: "number" },
    isInjury: { type: "boolean" },
  },
  required: ["name", "value", "isInjury"],
  additionalProperties: false,
};

const projectSchema: JSONSchemaType<Project> = {
  type: "object",
  properties: {
    name: { type: "string" },
    progress: { type: "number" },
    successThreshold: { type: "number" },
    description: { type: "string" },
  },
  required: ["name", "progress", "successThreshold", "description"],
  additionalProperties: false,
};

const itemSchema: JSONSchemaType<Item> = {
  type: "object",
  properties: {
    name: { type: "string" },
    currentStrength: { type: "number" },
    maxStrength: { type: "number" },
    powers: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["name", "currentStrength", "maxStrength", "powers"],
  additionalProperties: false,
};

export const charSheetDTOSchema: JSONSchemaType<CharSheetDTO> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    updatedAt: { type: "string" },
    version: { type: "string" },

    powers: { type: "array", items: powerSchema },
    dreamlandPowers: { type: "array", items: powerSchema },
    weakness: powerSchema,
    recollections: { type: "array", items: powerSchema },
    mentalConditions: { type: "array", items: mentalConditionSchema },
    bodyWounds: { type: "array", items: mentalConditionSchema },
    temporalConditions: { type: "array", items: powerSchema },
    luck: { type: "number" },
    items: { type: "array", items: itemSchema },
    projects: { type: "array", items: projectSchema },
    notes: { type: "string" },
  },
  required: [
    "id",
    "name",
    "type",
    "updatedAt",
    "version",

    "powers",
    "dreamlandPowers",
    "weakness",
    "recollections",
    "mentalConditions",
    "bodyWounds",
    "temporalConditions",
    "luck",
    "items",
    "projects",
    "notes",
  ],
  additionalProperties: false,
};

export const validateCharSheetDTO = ajv.compile(charSheetDTOSchema);
