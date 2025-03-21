"use client"

import * as React from "react"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"

export function MarkdownRendererExample() {
  const basicExample = `
# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold text** and *italic text*.

- List item 1
- List item 2
- List item 3

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

[This is a link](https://example.com)

> This is a blockquote
  `

  const codeExample = `
\`\`\`javascript
// This is a code block
function hello() {
  console.log("Hello, world!");
}
\`\`\`

Inline code: \`const x = 10;\`
  `

  const tableExample = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
  `

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Markdown Renderer</h2>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Basic Markdown</h3>
        <div className="border rounded-lg p-4 bg-card">
          <MarkdownRenderer content={basicExample} />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Code Blocks</h3>
        <div className="border rounded-lg p-4 bg-card">
          <MarkdownRenderer content={codeExample} />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Tables</h3>
        <div className="border rounded-lg p-4 bg-card">
          <MarkdownRenderer content={tableExample} />
        </div>
      </div>
    </div>
  )
}
