import {
  ConditionalBranch,
  ConditionalSpecification,
  DefaultConditionalBranch,
  DialogActionType,
  DialogState,
  SampleUtterance,
} from "@aws-sdk/client-lex-models-v2"
import { Slot } from "./types.js"

export const elicitSlot = (
  slot: Slot,
  intent?: DialogState["intent"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  dialogAction: {
    type: DialogActionType.ElicitSlot,
    slotToElicit: slot.slotName,
  },
  intent,
  sessionAttributes,
})

export const conditionalBranch = (
  name: ConditionalBranch["name"],
  expressionString: NonNullable<
    ConditionalBranch["condition"]
  >["expressionString"],
  nextStep: NonNullable<ConditionalBranch["nextStep"]>,
  response?: ConditionalBranch["response"]
): ConditionalBranch  => ({
  name,
  condition: { expressionString },
  nextStep,
  response,
})

export const defaultBranch = (
  nextStep: DefaultConditionalBranch["nextStep"],
  response?: DefaultConditionalBranch["response"]
): DefaultConditionalBranch => ({
  nextStep,
  response,
})

export const conditions = (
  conditionalBranches: ConditionalSpecification["conditionalBranches"],
  defaultBranch: ConditionalSpecification["defaultBranch"],
  active: ConditionalSpecification["active"] = true
): ConditionalSpecification => ({
  conditionalBranches,
  defaultBranch,
  active,
})

export const evaluateConditional = (
  sessionAttributes?: DialogState["sessionAttributes"],
  intent?: DialogState["intent"]
): DialogState => ({
  dialogAction: {
    type: DialogActionType.EvaluateConditional,
  },
  sessionAttributes,
  intent,
})

export const startIntent = (
  intent: NonNullable<DialogState["intent"]>["name"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  intent: {
    name: intent,
  },
  sessionAttributes,
  dialogAction: {
    type: "StartIntent",
  },
})

export const endConversation = (
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  sessionAttributes,
  dialogAction: {
    type: DialogActionType.EndConversation,
  },
})

export const invokeDialogCodeHook = (
  intent?: DialogState["intent"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  dialogAction: {
    type: DialogActionType.InvokeDialogCodeHook,
  },
  intent,
  sessionAttributes,
})

export const closeIntent = (
  intent?: DialogState["intent"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  dialogAction: {
    type: DialogActionType.CloseIntent,
  },
  intent,
  sessionAttributes,
})

export const confirmIntent = (
  intent?: DialogState["intent"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  dialogAction: {
    type: DialogActionType.ConfirmIntent,
  },
  intent,
  sessionAttributes,
})

export const elicitIntent = (
  intent?: DialogState["intent"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  dialogAction: {
    type: "ElicitIntent",
  },
  intent,
  sessionAttributes,
})

export const fulfillIntent = (
  intent?: DialogState["intent"],
  sessionAttributes?: DialogState["sessionAttributes"]
): DialogState => ({
  dialogAction: {
    type: DialogActionType.FulfillIntent,
  },
  intent,
  sessionAttributes,
})

export const utterances = (utterances: string[]): SampleUtterance[] =>
  utterances.map((utterance) => ({ utterance }))

export const plainTextMessage = (message: string) => ({
  messageGroups: [
    {
      message: {
        plainTextMessage: {
          value: message,
        },
      },
    },
  ],
})
