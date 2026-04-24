import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function ContentRenderer({ source = "", sourceFormat = "markdown" }) {
  if (sourceFormat === "latex") {
    return (
      <div className="article-content">
        <pre className="latex-source">
          <code>{source}</code>
        </pre>
      </div>
    );
  }

  if (sourceFormat === "plaintext") {
    return (
      <div className="article-content article-content--plain">
        {source.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

export default ContentRenderer;
