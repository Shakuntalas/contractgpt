import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownRenderer({ content, className = "" }) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
