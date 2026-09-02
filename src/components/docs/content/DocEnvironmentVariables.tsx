import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocTable } from '@/components/docs/DocBlocks';

export function DocEnvironmentVariables() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Environment Variables</DocHeading>
      <DocParagraph>
        Chirograph Verify uses two environment variables. Each belongs in a different part of
        your stack.
      </DocParagraph>

      <DocTable
        headers={['Variable', 'Used in', 'Description']}
        rows={[
          [<code className="font-mono text-sm text-ink-800">CHIROGRAPH_SECRET_KEY</code>, 'Server / backend', 'Secret API key for creating challenges and redeeming results. Never expose to the browser.'],
          [<code className="font-mono text-sm text-ink-800">CHIROGRAPH_PUBLISHABLE_KEY</code>, 'Browser / frontend', 'Publishable key for the widget SDK. Safe for client-side use.'],
        ]}
      />

      <DocHeading level={3} id="server-side">Server-side configuration</DocHeading>
      <DocCode
        code={`# .env (server-side — never commit this file)\nCHIROGRAPH_SECRET_KEY="sk_live_..."\nCHIROGRAPH_PUBLISHABLE_KEY="pk_live_..."`}
        language="bash"
        filename=".env"
      />

      <DocHeading level={3} id="client-side">Client-side configuration</DocHeading>
      <DocParagraph>
        Only the publishable key should be available to the browser. In a Vite project, prefix
        the variable with <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-sm text-ink-800">VITE_</code>:
      </DocParagraph>
      <DocCode
        code={`# .env (client-safe)\nVITE_CHIROGRAPH_PUBLISHABLE_KEY="pk_live_..."`}
        language="bash"
        filename=".env"
      />
      <DocCode
        code={`// Access in frontend code\nconst publishableKey = import.meta.env.VITE_CHIROGRAPH_PUBLISHABLE_KEY;`}
        language="ts"
        filename="widget.ts"
      />

      <DocHeading level={3} id="dev-prod-separation">Development and production separation</DocHeading>
      <DocParagraph>
        Use separate keys for development and production environments. Never share production
        keys with development environments or vice versa.
      </DocParagraph>
      <DocTable
        headers={['Environment', 'Secret key', 'Publishable key']}
        rows={[
          ['Development', <code className="font-mono text-sm text-ink-800">sk_test_...</code>, <code className="font-mono text-sm text-ink-800">pk_test_...</code>],
          ['Production', <code className="font-mono text-sm text-ink-800">sk_live_...</code>, <code className="font-mono text-sm text-ink-800">pk_live_...</code>],
        ]}
      />

      <DocCallout variant="danger" title="Never commit .env files">
        <code className="font-mono text-sm">.env</code> files containing secrets must not be
        committed to GitHub. Ensure <code className="font-mono text-sm">.env</code> is in your{' '}
        <code className="font-mono text-sm">.gitignore</code> file. Use environment variables or
        secrets management in your hosting platform (Railway, Vercel, Netlify, etc.) for
        production.
      </DocCallout>
    </DocPageWrapper>
  );
}
