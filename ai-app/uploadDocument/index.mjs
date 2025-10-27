import { readFile } from 'fs/promises';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OllamaEmbeddings } from '@langchain/ollama';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

try {
  const text = await readFile(`${process.cwd()}/policy.txt`, 'utf8');

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ["\n\n", "\n", " ", ""],
    chunkOverlap: 50,
  });

  const splittedText = await textSplitter.createDocuments([text]);

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

  console.log(splittedText);

  await SupabaseVectorStore.fromDocuments(
    splittedText,
    new OllamaEmbeddings({ model: 'llama3.1:8b' }), 
    { client: supabaseClient, tableName: "documents" }
  );
} catch (error) {
  console.log(error);
}