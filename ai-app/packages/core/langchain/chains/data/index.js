import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { retriever } from '@chatapp/retriever';
import { standaloneQuestionTemplate, answerTemplate } from '@chatapp/templates';
import { dataDocuments } from '@chatapp/datadocuments';
import { llm } from '@chatapp/llm';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ConversationSummaryMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

const memory = new ConversationSummaryMemory({
  llm,
  memoryKey : 'chat_history',
  returnMessages : true,
  inputKey : 'question',
});

const standaloneQuestionChain = RunnableSequence.from([
  standaloneQuestionTemplate,
  llm,
  new StringOutputParser()
]);

const retrieverChain = RunnableSequence.from([
  (data) => {
    return data.standaloneQuestion
  },
  retriever,
  dataDocuments
]);

const conversationChain = new ConversationChain({
  llm,
  prompt : answerTemplate,
  memory
});

export const chain = RunnableSequence.from([
  { standaloneQuestion: standaloneQuestionChain, 
    originalQuestion: new RunnablePassthrough() 
  },
  { 
    context: retrieverChain, 
    question: ({ originalQuestion }) => originalQuestion.question 
  },
  conversationChain
]);
