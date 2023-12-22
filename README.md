# Build an Amazon Lex V2 Chatbot using AWS SDK

## Configure settings

Configure the Bot properties in `src/config.ts`.
Specify a name for the Bot you are building and provide the arn of the role that has permissions to delete and (re)create the Bot. For example, `arn:aws:iam::123456789012:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots_ABCDEFGHIJK`

*Caution: Running this project will delete and re-create the bot with the name specified in config.ts. If you specify the name of an existing bot, it will be over-written.*

## Install dependencies

Install dependencies for the project by running:

   `npm install`

## Build the (BookTripUsingSDK) bot

Build the bot by running:

`npm run dev`

This will take a few seconds to complete. Make sure your credentials are accessible in the shell when running the above command.

Examine the `BookTripUsingSDK` Bot created in the AWS Console.

It should contain the `BookCar` and `BookHotel` intents.

## Build and Test the (BookTripUsingSDK) bot in the AWS Console

Select the `BookTripUsingSDK` bot in the AWS Console and Build it.
Next, test the Bot using the test panel in the Console. It should work just like the default `BookTrip` Bot. Examine the Visual Builder diagrams for the Intents. They should be identical to the ones for the intents in the `BookTrip` Bot.

## Creating your own intents

1. To add an intent, create a new folder under `Intents` with the name of the new Intent. Inside the folder, create a file called `Intent.ts` to define the intent, `slots.ts` to define the slots for the new intent, and `utterances.ts` to specify utterances. If the Intent needs new slot types they can be defined and exported from `SlotTypes/slotTypes.ts`.

2. In `Intent.ts` create an object of type `Intent` to specify the intent settings, including the `initialResponseSetting`. `Intent.ts` must export the intent object and all the slots required by the intent. Refer to `Intent.ts` for `BookCar` and `BookHotel`.

3. Define the slots required for the intent in `slots.ts`. All slots created in the file must be exported so that they can be referred to and exported from `Intents.ts`. Refer to `slots.ts` for `BookCar` and `BookHotel`.

4. After defining the intent, export it from the `Intents\index.ts` file. This will ensure that the next time you build the bot the new intent will be included in the Bot.

5. Re-run `npm run dev` to rebuild the Bot with the new Intents.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

