import { notFound } from "next/navigation";
import { Client as ElasticClient } from "@elastic/elasticsearch";
import { DocumentPost } from "@/types/post";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const esDoc = await elasticClient.search({
    index: "gic_docs",
    query: {
      match_phrase: {
        slug,
      },
    },
  });

  if (!esDoc.hits.hits || esDoc.hits.hits.length === 0) {
    return notFound();
  }

  const post = esDoc.hits.hits[0]._source as DocumentPost;

  return (
    <div className="content">
      <div className="center-children-horizontally">
        <div className="container flex flex-col gap-4 pt-4 pb-8">
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <div>
                <span className="font-semibold text-primary">
                  {post.category}
                </span>
              </div>
              <div className="prose prose-slate prose-a:text-primary max-w-none prose-p:mt-1 prose-p:mb-1 prose-ol:mt-1 prose-ol:mb-1 prose-ul:mt-1 prose-ul:mb-1 prose-h2:mt-2 prose-h2:mb-1 prose-h3:mt-1">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {post.rewrittenText}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
