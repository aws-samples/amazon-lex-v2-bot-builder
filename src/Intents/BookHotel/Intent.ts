import {
  elicitSlot,
  endConversation,
  invokeDialogCodeHook,
  startIntent,
  utterances,
} from "../../Bot/botUtils.js"
import { Intent, Slot } from "../../Bot/types.js"
import sampleUtterances from "./utterances.js"
import { checkInDate, location, nights, roomType } from "./slots.js"
const intent: Intent = {
  intentName: "BookHotel",
  description: "Intent to book a hotel",
  sampleUtterances: utterances(sampleUtterances),
  initialResponseSetting: {
    nextStep: invokeDialogCodeHook(),
    codeHook: {
      active: true,
      enableCodeHookInvocation: true,
      invocationLabel: "MAIN_PROMPT",
      postCodeHookSpecification: {
        successNextStep: elicitSlot(location),
        failureNextStep: endConversation(),
        timeoutNextStep: endConversation(),
      },
    },
  },
  intentConfirmationSetting: {
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value:
                "Okay, I have you down for a {Nights} night stay in {Location} starting {CheckInDate}.  Shall I book the reservation?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    confirmationNextStep: endConversation(),
    declinationNextStep: endConversation(),
    declinationResponse: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "Okay, I have cancelled your reservation in progress.",
            },
          },
        },
      ],
    },
    failureNextStep: startIntent("FallbackIntent"),
  },
}

export default {
  intent,
  slots: [location, checkInDate, nights, roomType] as Slot[],
}
