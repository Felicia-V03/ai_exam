import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

export const standaloneQuestionTemplate = PromptTemplate.fromTemplate(
  `Om användaren ställer en kort fråga, tolka den som en fråga om produkter, beställning eller leverans beroende på kontext, och omformulera den tydligt.
  Fråga: {question},
  Standalone question:`
);

export const answerTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Du är en hjälpsam AI-assistent. Svara **direkt** på frågan utan att skriva ”Enligt texten” eller ”Jag vet svaret” på deras frågor baserat på den givna kontexten. Om du inte vet svaret, säg att du inte vet det istället för att hitta på ett svar.`
  ],
  new MessagesPlaceholder('chat_history'),
  [
    "user",
    `Kontext: {context}
    Fråga: {question}
    Svar:`
  ]
]);