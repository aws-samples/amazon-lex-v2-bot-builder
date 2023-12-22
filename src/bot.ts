import { LexModelsV2Client } from "@aws-sdk/client-lex-models-v2"
import config from "./config.js"
import createOrReplaceBot from "./Bot/createOrReplaceBot.js"

export const lexClient = new LexModelsV2Client({ region: config.region })

await createOrReplaceBot()
