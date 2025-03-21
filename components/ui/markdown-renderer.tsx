"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  tableClassName?: string; // Add option for custom table styling
}

export function MarkdownRenderer({ 
  content, 
  className,
  tableClassName 
}: MarkdownRendererProps) {
  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-table:border-collapse markdown-content", 
      className
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Add remark-gfm plugin for tables and other GFM features
        components={{
          // Customize table rendering
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className={cn("border-collapse border border-border w-full rounded-md", tableClassName)} {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-muted" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-border p-2 text-left font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border p-2" {...props} />
          ),
          // Customize heading rendering
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-600 mt-6 mb-3" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-600 mt-5 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-600 mt-4 mb-2" {...props} />
          ),
          // Customize list rendering
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
