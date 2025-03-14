"use client";

import React, { useActionState, useState } from "react";
import Image from "next/image";
import Form from "next/form";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MarkdownSkeleton } from "../components/shared/MarkdownSkeleton";

import { runSearch } from "./actions";

const initialState = {
  message: null as string | null,
} as const;

export default function HomePage() {
  const [state, formAction, pending] = useActionState<
    typeof initialState,
    FormData
  >(runSearch, initialState);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="content">
      <div className="center-children-horizontally bg-zinc-50 border-b border-b-zinc-200">
        <div className="container flex flex-col gap-4 pt-4 pb-8">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Emblem_of_Sri_Lanka.svg"
            alt="Sri Lanka Government Emblem"
            width={80}
            height={80}
            priority
          />
          <h1 className="text-4xl font-bold">
            Welcome to the Sri Lankan Government Information Center
          </h1>
          <h2 className="text-2xl font-normal">What do you need help with?</h2>
        </div>
      </div>
      <div className="center-children-horizontally">
        <div className="container flex flex-col gap-4 py-6">
          <div>
            <Form action={formAction} className="flex flex-row gap-1">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask your question"
                name="searchQuery"
                className="outline-2 text-xl px-4 py-2 flex-1 outline-graybase focus:outline-primary"
              />
              <button
                className="bg-primary text-white px-2 py-2 hover:to-blue-900 outline-2 flex"
                disabled={!searchQuery || searchQuery.length < 3}
              >
                {pending ? "Searching..." : "Search"}
              </button>
            </Form>
          </div>
          <div className="min-h-[350px]">
            {pending ? (
              <MarkdownSkeleton />
            ) : (
              <div className="prose prose-slate prose-a:text-primary max-w-none prose-p:mt-1 prose-p:mb-1 prose-ol:mt-2 prose-ol:mb-2 prose-ul:mt-2 prose-ul:mb-2">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {state?.message?.toString()}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
