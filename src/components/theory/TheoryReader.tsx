import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

export interface TheoryReaderProps {
  content: string;
  chapterNumber?: number;
  chapterTitle?: string;
  className?: string;
}

/**
 * Custom sanitize schema: enforces strict safe tags and attributes,
 * explicitly stripping <script>, <iframe>, javascript: schemes, and inline event handlers.
 */
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': ['className', 'style', 'id', 'aria-*', 'lang'],
    a: ['href', 'title', 'target', 'rel'],
    th: ['align', 'colSpan', 'rowSpan', 'scope'],
    td: ['align', 'colSpan', 'rowSpan'],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ['http', 'https', 'mailto'],
  },
};

export const TheoryReader: React.FC<TheoryReaderProps> = ({
  content,
  chapterNumber,
  chapterTitle,
  className = '',
}) => {
  // Pre-process markdown to clean extraction metadata if needed
  const processedContent = useMemo(() => {
    if (!content) return '';
    // Remove internal comment annotations like <!-- subtopic_id: ... -->
    let cleaned = content.replace(/<!--[\s\S]*?-->/g, '').trim();
    // Remove redundant leading H1 chapter title from markdown if already presented
    cleaned = cleaned.replace(/^#\s+(?:Chapter|Chapitre)\s+\d+[\s\S]*?\n+/i, '').trim();
    return cleaned;
  }, [content]);

  return (
    <article
      className={`theory-reader ${className}`}
      aria-label={chapterTitle ? `Théorie : ${chapterTitle}` : 'Théorie grammaticale'}
    >
      {chapterNumber && (
        <header className="theory-header">
          <span className="theory-chap-pill">Chapitre {chapterNumber}</span>
          {chapterTitle && <h1 className="theory-title">{chapterTitle}</h1>}
        </header>
      )}

      {processedContent ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
          components={{
            table({ children, node: _node, ...props }) {
              return (
                <div
                  className="theory-table-wrapper"
                  role="region"
                  aria-label="Tableau de grammaire et conjugaison"
                  tabIndex={0}
                >
                  <table className="theory-table" {...props}>
                    {children}
                  </table>
                </div>
              );
            },
            th({ children, node: _node, ...props }) {
              return (
                <th className="theory-th" scope="col" {...props}>
                  {children}
                </th>
              );
            },
            td({ children, node: _node, ...props }) {
              // Mark French content cells with lang="fr" for accessibility and TTS
              return (
                <td className="theory-td" lang="fr" {...props}>
                  {children}
                </td>
              );
            },
            blockquote({ children, node: _node, ...props }) {
              // Render styled callout boxes for pedagogical alerts
              return (
                <aside
                  className="theory-callout theory-callout-tip"
                  role="note"
                  aria-label="Note pédagogique du professeur"
                  {...props}
                >
                  <div className="callout-icon" aria-hidden="true">
                    💡
                  </div>
                  <div className="callout-content">{children}</div>
                </aside>
              );
            },
            h2({ children, node: _node, ...props }) {
              return (
                <h2 className="theory-h2" {...props}>
                  <span className="heading-marker" aria-hidden="true">§</span>
                  {children}
                </h2>
              );
            },
            h3({ children, node: _node, ...props }) {
              return (
                <h3 className="theory-h3" {...props}>
                  {children}
                </h3>
              );
            },
            h4({ children, node: _node, ...props }) {
              return (
                <h4 className="theory-h4" {...props}>
                  {children}
                </h4>
              );
            },
            code({ children, node: _node, ...props }) {
              return (
                <code className="theory-code-inline" lang="fr" {...props}>
                  {children}
                </code>
              );
            },
            strong({ children, node: _node, ...props }) {
              return (
                <strong className="theory-strong" {...props}>
                  {children}
                </strong>
              );
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      ) : (
        <p className="theory-empty-content text-muted">
          Aucun contenu de théorie disponible pour ce chapitre.
        </p>
      )}
    </article>
  );
};

export default TheoryReader;
