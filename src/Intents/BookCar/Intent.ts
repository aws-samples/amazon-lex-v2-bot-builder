import {
  elicitSlot,
  endConversation,
  startIntent,
  utterances,
} from "../../Bot/botUtils.js"
import { Intent, Slot } from "../../Bot/types.js"
import {
  carType,
  driverAge,
  pickupCity,
  pickupDate,
  returnDate,
} from "./slots.js"
import sampleUtterances from "./utterances.js"
const intent: Intent = {
  intentName: "BookCar",
  description: "Intent to book a car",
  sampleUtterances: utterances(sampleUtterances),
  initialResponseSetting: {
    nextStep: elicitSlot(pickupCity),
  },
  intentConfirmationSetting: {
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value:
                "Okay, I have you down for a {CarType} rental in {PickUpCity} from {PickUpDate} to {ReturnDate}.  Should I book the reservation?",
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
  slots: [pickupCity, pickupDate, returnDate, driverAge, carType] as Slot[],
}
