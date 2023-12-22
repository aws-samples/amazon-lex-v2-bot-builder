import { SlotType } from "../Bot/types.js"

const roomTypeValues: SlotType = {
  slotTypeName: "RoomTypeValues",
  description: "Enumeration representing possible types of a hotel room",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    {
      sampleValue: {
        value: "king",
      },
    },
    {
      sampleValue: {
        value: "queen",
      },
    },
    {
      sampleValue: {
        value: "deluxe",
      },
    },
  ],
}

const carTypeValues: SlotType = {
  slotTypeName: "CarTypeValues",
  description:
    "Enumeration representing possible types of cars available for rental",
  valueSelectionSetting: {
    resolutionStrategy: "OriginalValue",
  },
  slotTypeValues: [
    {
      sampleValue: {
        value: "economy",
      },
    },
    {
      sampleValue: {
        value: "standard",
      },
    },
    {
      sampleValue: {
        value: "midsize",
      },
    },
    {
      sampleValue: {
        value: "full size",
      },
    },
  ],
}

export default [roomTypeValues, carTypeValues] as SlotType[]
