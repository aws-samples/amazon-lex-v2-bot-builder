import { DialogActionType } from "@aws-sdk/client-lex-models-v2"
import {
  confirmIntent,
  elicitIntent,
  elicitSlot,
  startIntent,
} from "../../Bot/botUtils.js"
import { Slot } from "../../Bot/types.js"

export const carType: Slot = {
  slotName: "CarType",
  slotTypeName: "CarTypeValues",
  description: "Type of car being reserved.",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value:
                "What type of car would you like to rent?  Our most popular options are economy, midsize, and luxury",
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

export const driverAge: Slot = {
  slotName: "DriverAge",
  slotTypeName: "AMAZON.Number",
  description: "Age of the driver during the car rental.",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "How old is the driver for this rental?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(carType),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}

export const returnDate: Slot = {
  slotName: "ReturnDate",
  slotTypeName: "AMAZON.Date",
  description:
    "Date of return.  Should be required when the flight is not one way.",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What day do you want to return the car?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(driverAge),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}

export const pickupDate: Slot = {
  slotName: "PickUpDate",
  slotTypeName: "AMAZON.Date",
  description: "Date to start the rental",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What day do you want to start your rental?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(returnDate),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}

export const pickupCity: Slot = {
  slotName: "PickUpCity",
  slotTypeName: "AMAZON.City",
  description: "City in which the car reservation is being made",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "In what city do you need to rent a car?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(pickupDate),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
}
