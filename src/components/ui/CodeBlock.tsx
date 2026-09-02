import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
  dark?: boolean;
}

/**
 * Lightweight syntax-highlighted code block.
 * Uses a simple tokenizer for shell, bash, js/ts, json, http.
 * No external deps — keeps bundle small.
 */
export function CodeBlock({
  code,
  language = 'bash',
  filename,
  showLineNumbers = false,
  className,
  dark = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const lines = code.split('\n');

  return (
    <div
      className={`group overflow-hidden rounded-xl border ${dark ? 'bg-ink-950 border-white/10' : 'bg-ink-50 border-ink-200'} ${className ?? ''}`.trim()}
    >
      {(filename || language) && (
        <div
          className={`flex items-center justify-between border-b px-4 py-2.5 ${dark ? 'border-white/10 bg-white/[0.02]' : 'border-ink-200 bg-white'}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-white/15' : 'bg-ink-300'}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-white/15' : 'bg-ink-300'}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-white/15' : 'bg-ink-300'}`} />
            </div>
            {filename && (
              <span className={`ml-2 font-mono text-xs ${dark ? 'text-ink-400' : 'text-ink-500'}`}>
                {filename}
              </span>
            )}
          </div>
          <button
            onClick={copy}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${dark ? 'text-ink-400 hover:bg-white/10 hover:text-ink-200' : 'text-ink-500 hover:bg-ink-200 hover:text-ink-700'}`}
            aria-label="Copy code"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <div className="code-scroll overflow-x-auto">
        <pre className={`p-4 text-[13px] leading-relaxed ${dark ? 'text-ink-200' : 'text-ink-800'}`}>
          <code className="font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span
                    className={`mr-4 inline-block w-6 shrink-0 select-none text-right ${dark ? 'text-ink-600' : 'text-ink-400'}`}
                  >
                    {i + 1}
                  </span>
                )}
                <span
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: tokenize(line, language, dark) }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/**
 * Very small tokenizer. Good enough for marketing code samples.
 * Escapes HTML then wraps keywords/strings/comments in spans.
 */
function tokenize(line: string, lang: string, dark: boolean): string {
  const esc = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const commentColor = dark ? '#475569' : '#94a3b8';
  const stringColor = dark ? '#86efac' : '#16a34a';
  const keywordColor = dark ? '#93c5fd' : '#2563eb';
  const fnColor = dark ? '#c4b5fd' : '#7c3aed';
  const numColor = dark ? '#fca5a5' : '#dc2626';
  const punctColor = dark ? '#94a3b8' : '#64748b';

  // Comments
  if (lang === 'bash' || lang === 'shell') {
    return esc.replace(/^(#.*)$/gm, `<span style="color:${commentColor}">$1</span>`);
  }
  if (lang === 'http') {
    return esc.replace(/^(#.*)$/gm, `<span style="color:${commentColor}">$1</span>`);
  }

  // JS/TS/JSON
  let result = esc;

  // Comments
  result = result.replace(/(\/\/.*$)/g, `<span style="color:${commentColor}">$1</span>`);

  // Strings (single, double, backtick)
  result = result.replace(
    /(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|`[^`]*?`)/g,
    `<span style="color:${stringColor}">$1</span>`
  );

  // Keywords
  const keywords =
    /\b(const|let|var|function|return|async|await|import|from|export|default|if|else|new|class|extends|try|catch|throw|typeof|interface|type|enum|public|private|readonly)\b/g;
  result = result.replace(keywords, `<span style="color:${keywordColor}">$1</span>`);

  // Booleans / null
  result = result.replace(
    /\b(true|false|null|undefined)\b/g,
    `<span style="color:${numColor}">$1</span>`
  );

  // Numbers
  result = result.replace(/\b(\d+)\b/g, `<span style="color:${numColor}">$1</span>`);

  // Function calls
  result = result.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
    `<span style="color:${fnColor}">$1</span>(`
  );

  // Punctuation
  result = result.replace(/([{}[\]();,])/g, `<span style="color:${punctColor}">$1</span>`);

  return result;
}

interface CodeTab {
  label: string;
  code: string;
  language?: string;
  filename?: string;
}

export function CodeTabs({ tabs, dark = true }: { tabs: CodeTab[]; dark?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="mb-3 flex gap-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              active === i
                ? dark
                  ? 'bg-white/10 text-white'
                  : 'bg-ink-100 text-ink-900'
                : dark
                  ? 'text-ink-400 hover:text-ink-200'
                  : 'text-ink-500 hover:text-ink-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={tabs[active].code}
        language={tabs[active].language ?? 'bash'}
        filename={tabs[active].filename}
        dark={dark}
      />
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-800">
      {children}
    </code>
  );
}
