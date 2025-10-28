import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

export const standaloneQuestionTemplate = PromptTemplate.fromTemplate(
  `Skicka gärna både samtalet och följdfrågan, så kan jag omformulera följdfrågan till en tydlig och fristående fråga.
  Fråga: {question},
  Standalone question:`
);

export const answerTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Du är en hjälpsam AI-assistent som hjälper användare att svara på deras frågor baserat på den givna kontexten. Om du inte vet svaret, säg att du inte vet det istället för att hitta på ett svar.`
  ],
  new MessagesPlaceholder('chat_history'),
  [
    "user",
    `Kontext: {context}
    Fråga: {question}
    Svar:`
  ]
]);