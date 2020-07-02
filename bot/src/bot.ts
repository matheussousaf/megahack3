const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");

export async function getResponse(message: string) {
  const sessionId = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    "amazing-plateau-278500",
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "pt-BR",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log(responses);
  return responses[0].queryResult.fulfillmentText;
}
