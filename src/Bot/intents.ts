import {
  CreateIntentCommand,
  CreateSlotCommand,
  CreateSlotCommandOutput,
  CreateSlotTypeCommand,
  SlotPriority,
  UpdateIntentCommand,
} from "@aws-sdk/client-lex-models-v2"
import { error } from "console"
import * as Intents from "../Intents/index.js"
import slotTypes from "../SlotTypes/slotTypes.js"
import { lexClient } from "../bot.js"
import config from "../config.js"
import {
  getBotSummary,
  getIntentSummary,
  getSlotTypeSummary,
} from "./createOrReplaceBot.js"

export const createIntents = async () => {
  const botSummary = await getBotSummary(config.botName)
  if (!botSummary?.botId) {
    error("Cannot create Intents. Bot does not exist.")
  }
  const botMeta = {
    botId: botSummary?.botId,
    botVersion: "DRAFT",
    localeId: config.locale,
  }
  await createSlotTypes(botMeta)
  await Promise.all(
    Object.values(Intents).map(async (intent) => {
      const createIntentCommand = new CreateIntentCommand({
        ...botMeta,
        ...intent.intent,
      })
      await lexClient.send(createIntentCommand)
      if (botMeta.botId && intent.intent.intentName) {
        const intentSummary = await getIntentSummary(
          botMeta?.botId,
          intent.intent.intentName
        )
        if (!intentSummary?.intentId) {
          error("Cannot create Slots. Intent does not exist.")
        }
        const slotPriorities: SlotPriority[] = []
        await Promise.all(
          intent.slots?.map(async (slot) => {
            if (botMeta.botId && slot.slotTypeName) {
              let slotTypeId = slot.slotTypeName
              if (!slot.slotTypeName.startsWith("AMAZON.")) {
                const slotTypeSummary = await getSlotTypeSummary(
                  botMeta.botId,
                  slot.slotTypeName
                )
                slotTypeId = slotTypeSummary?.slotTypeId!
              }
              const createSlotCommand = new CreateSlotCommand({
                ...botMeta,
                ...slot,
                intentId: intentSummary?.intentId,
                slotTypeId,
              })
              const createSlotResponse: CreateSlotCommandOutput =
                await lexClient.send(createSlotCommand)
              if (createSlotResponse.slotId) {
                slotPriorities.push({
                  priority: slot.priority,
                  slotId: createSlotResponse.slotId,
                })
              }
            }
          })
        )
        const updateIntentCommand = new UpdateIntentCommand({
          ...botMeta,
          intentId: intentSummary?.intentId,
          ...intent.intent,
          slotPriorities: slotPriorities,
        })
        await lexClient.send(updateIntentCommand)
      }
    })
  )
}

async function createSlotTypes(botMeta: {
  botId: string | undefined
  botVersion: string
  localeId: string
}) {
  await Promise.all(
    slotTypes?.map(async (slotType) => {
      const createSlotTypeCommand = new CreateSlotTypeCommand({
        ...botMeta,
        ...slotType,
      })
      await lexClient.send(createSlotTypeCommand)
    })
  )
}
