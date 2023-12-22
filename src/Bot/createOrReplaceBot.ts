import {
  BotFilterName,
  BotFilterOperator,
  BotSummary,
  CreateBotCommand,
  CreateBotLocaleCommand,
  DeleteBotCommand,
  IntentFilterName,
  IntentFilterOperator,
  IntentSummary,
  ListBotsCommand,
  ListIntentsCommand,
  ListSlotTypesCommand,
  SlotTypeFilterName,
  SlotTypeFilterOperator,
  SlotTypeSummary,
  waitUntilBotAvailable,
  waitUntilBotLocaleCreated,
} from "@aws-sdk/client-lex-models-v2"
import { lexClient } from "../bot.js"
import config from "../config.js"
import { createIntents } from "./intents.js"
import { Config } from "./types.js"
import { oraPromise } from "ora"

export const getBotSummary = async (
  botName: string
): Promise<BotSummary | undefined> => {
  const listCommand = new ListBotsCommand({
    filters: [
      {
        name: BotFilterName.BotName,
        operator: BotFilterOperator.Equals,
        values: [botName],
      },
    ],
  })
  const { botSummaries } = await lexClient.send(listCommand)
  if (botSummaries !== undefined && botSummaries.length > 0)
    return botSummaries[0]
  else return undefined
}

export const getIntentSummary = async (
  botId: string,
  intentName: string
): Promise<IntentSummary | undefined> => {
  const listCommand = new ListIntentsCommand({
    filters: [
      {
        name: IntentFilterName.IntentName,
        operator: IntentFilterOperator.Equals,
        values: [intentName],
      },
    ],
    botId: botId,
    botVersion: "DRAFT",
    localeId: config.locale,
  })
  const { intentSummaries } = await lexClient.send(listCommand)
  if (intentSummaries !== undefined && intentSummaries.length > 0)
    return intentSummaries[0]
  else return undefined
}

export const getSlotTypeSummary = async (
  botId: string,
  slotTypeName: string
): Promise<SlotTypeSummary | undefined> => {
  const listCommand = new ListSlotTypesCommand({
    filters: [
      {
        name: SlotTypeFilterName.SlotTypeName,
        operator: SlotTypeFilterOperator.Equals,
        values: [slotTypeName],
      },
    ],
    botId: botId,
    botVersion: "DRAFT",
    localeId: config.locale,
  })
  const { slotTypeSummaries } = await lexClient.send(listCommand)
  if (slotTypeSummaries !== undefined && slotTypeSummaries.length > 0)
    return slotTypeSummaries[0]
  else return undefined
}

const deleteBot = async (botName: string) => {
  const botSummary = await getBotSummary(botName)
  if (botSummary == undefined) return
  const deleteBotCommand = new DeleteBotCommand({
    botId: botSummary?.botId,
  })
  await lexClient.send(deleteBotCommand)
  const checkInterval = async () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(async () => {
        const botSummaryStatus = await getBotSummary(botName)
        try {
          if (botSummaryStatus === undefined) {
            clearInterval(interval)
            resolve()
          }
        } catch (error) {
          console.error("Error checking Bot status:", error)
        }
      }, 1000)
    })
  }
  await checkInterval()
}

const createBot = async (config: Config) => {
  const createBotCommand = new CreateBotCommand({
    botName: config.botName,
    dataPrivacy: { childDirected: false },
    idleSessionTTLInSeconds: config.TTLInSeconds,
    roleArn: config.roleArn,
  })
  const createBotCommandOutput = await lexClient.send(createBotCommand)
  await waitUntilBotAvailable(
    { client: lexClient, maxWaitTime: 60 },
    { botId: createBotCommandOutput.botId }
  )

  await lexClient.send(
    new CreateBotLocaleCommand({
      botId: createBotCommandOutput.botId,
      botVersion: "DRAFT",
      localeId: config.locale,
      nluIntentConfidenceThreshold: 0.4,
    })
  )
  await waitUntilBotLocaleCreated(
    {
      client: lexClient,
      maxWaitTime: 60,
    },
    {
      botId: createBotCommandOutput.botId,
      botVersion: "DRAFT",
      localeId: config.locale,
    }
  )

  await createIntents()
}

export default async () => {
  const botSummary = await getBotSummary(config.botName)
  if (botSummary?.botId) {
    console.log(`Deleting ${config.botName}`)
    await oraPromise(deleteBot(config.botName), { successText: "Deleted" })
  }
  console.log(`Creating ${config.botName}`)
  await oraPromise(createBot(config), { successText: "Created" })
}
