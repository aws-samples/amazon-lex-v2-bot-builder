import {
  CreateIntentCommandInput,
  CreateSlotCommandInput,
  CreateSlotTypeCommandInput
} from "@aws-sdk/client-lex-models-v2"
import config from "../config.js"

export type Config = typeof config
export type SlotType = Omit<
  CreateSlotTypeCommandInput,
  "botId" | "botVersion" | "localeId"
>
export type Slot = Omit<
  CreateSlotCommandInput & { priority: number; slotTypeName: string },
  "botId" | "botVersion" | "localeId" | "intentId" | "slotTypeId"
>
export type Intent = Omit<
  CreateIntentCommandInput,
  "botId" | "botVersion" | "localeId"
>
