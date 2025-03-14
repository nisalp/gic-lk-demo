"use server";

import OpenAI from "openai";
import { track } from "@vercel/analytics/server";
import { Client as ElasticClient } from "@elastic/elasticsearch";

import { DocumentPost } from "@/types/post";

const ElasticCredentials =
  process.env.ELASTICSEARCH_USERNAME && process.env.ELASTICSEARCH_PASSWORD
    ? {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
      }
    : null;

const elasticClient = new ElasticClient({
  node: process.env.ELASTICSEARCH_NODE, // Elasticsearch endpoint
  auth: ElasticCredentials ?? undefined,
});

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

async function searchDocs(query: string): Promise<string | null> {
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    encoding_format: "float",
  });

  const docResults = await elasticClient.search<DocumentPost>({
    index: "gic_docs",
    knn: {
      field: "open_ai_embedding_vector",
      query_vector: queryEmbedding.data[0].embedding,
      k: 50,
      num_candidates: 100,
    },
  });

  const parsedResults = docResults.hits.hits
    .map((doc) =>
      doc._source
        ? {
            rewrittenTitle: doc._source.rewrittenTitle,
            url: doc._source.slug ? `/post/${doc._source.slug}` : "",
            audience: doc._source.audience,
            category: doc._source.category,
            tags: doc._source.tags,
            originalTitle: doc._source.originalTitle,
            summary: doc._source.summary,
          }
        : null
    )
    .filter((doc) => doc);

  console.log(parsedResults);

  const finalFilter = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    max_tokens: 4000,
    messages: [
      {
        role: "system",
        content: `
        Filter the documents relavent to the original question. Try to answer the question by referring to the search results. Do not try to answer questions directly. 
        Just direct the user towards resources. 
        
        <Important>
          Render href values exactly as mentioned in the \`url\` field. Do not modify.
        </Important>
        
        If you cannot find relevant resources that can answer the question, please mention that.

        If you're can't find any relavent resources, encourage the user to call the 1919 hotline to get more personalized suport. Add the 1919 as a hyperlink to a tel link.
        `,
      },
      {
        role: "user",
        content: `
            <Query>${query}</Query>
            <Results>${JSON.stringify(parsedResults)}</Results>,
        `,
      },
    ],
  });

  console.log(`Original Question: ${query}`);
  return finalFilter.choices[0].message.content;
}

type State = { message: string | null };

export async function runSearch(
  state: State,
  formData: FormData
): Promise<State> {
  const searchQuery = formData.get("searchQuery");

  if (!searchQuery) return { message: null };
  console.log(searchQuery);

  track("Search Query", {
    query: searchQuery as string,
  });

  const res = await searchDocs(searchQuery.toString());
  console.log(res);

  // mutate data
  // revalidate cache

  return { message: res };
}
