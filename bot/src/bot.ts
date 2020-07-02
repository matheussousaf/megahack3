import { response } from "express";

const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");

let contexts = []

export async function getResponse(message: string) {
  const sessionId = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    "amazing-plateau-278500",
    sessionId
  );

  let request;
  
  if(contexts.length > 0) {
    if(!contexts[0].name.includes("__system_counters__")) {
      request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: "pt-BR",
          },
        },
        queryParams: {
          contexts: [contexts[0]]
        }
      };
    }

  } else {
    request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "pt-BR",
        },
      },
    };
  }

  const responses = await sessionClient.detectIntent(request);
  if(responses[0].queryResult.outputContexts) {
    contexts = responses[0].queryResult.outputContexts;
  }
  return responses[0].queryResult.fulfillmentText;
}
