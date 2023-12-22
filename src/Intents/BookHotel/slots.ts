import { DialogActionType } from "@aws-sdk/client-lex-models-v2"
import {
  confirmIntent,
  elicitIntent,
  elicitSlot,
  startIntent,
} from "../../Bot/botUtils.js"
import { Slot } from "../../Bot/types.js"

export const roomType: Slot = {
  slotName: "RoomType",
  slotTypeName: "RoomTypeValues",
  description: "Enumeration of types of rooms that are offered by a hotel.",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What type of room would you like, queen, king or deluxe?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: confirmIntent(),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}

export const nights: Slot = {
  slotName: "Nights",
  slotTypeName: "AMAZON.Number",
  description: "Number of nights in the hotel stay.",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "How many nights will you be staying?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(roomType),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}

export const checkInDate: Slot = {
  slotName: "CheckInDate",
  slotTypeName: "AMAZON.Date",
  description: "Date of check-in",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What day do you want to check in?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(nights),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}

export const location: Slot = {
  slotName: "Location",
  slotTypeName: "AMAZON.City",
  description: "Location of the city in which the hotel is located",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What city will you be staying in?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(checkInDate),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}
