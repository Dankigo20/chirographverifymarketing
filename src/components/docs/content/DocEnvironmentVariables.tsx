import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocTable } from '@/components/docs/DocBlocks';

export function DocEnvironmentVariables() {
  return (
    <DocPageWrapper>
      <DocHeading level={1}>Environment Variables</DocHeading>
      <DocParagraph>
        Chirograph Verify uses the following server-side and browser configuration. Each belongs in a different part of
        your stack.
      </DocParagraph>

      <DocTable
        headers={['Variable', 'Used in', 'Description']}
        rows={[
          ['Secret API key', 'Server / backend', 'Secret API key for creating challenges and redeeming results. Never expose to the browser.'],
          ['Publishable widget key', 'Browser / frontend', 'Publishable key for the widget SDK. Safe for client-side use.'],
        ]}
      />

      <DocHeading level={3} id="server-side">Server-side configuration</DocHeading>
      <DocCode
        code={`# .env (server-side — never commit this file)\\nCHIROGRAPH_SECRET_KEY="<64 hex chars>"`}
        language="bash"
        filename=".env"
      />

      <DocHeading level={3} id="client-side">Client-side configuration</DocHeading>
      <DocParagraph>
        Only the publishable key should be available to the browser. In a Vite project, prefix
        the variable with <code className="rounded bg-white/[0.03] px-1 py-0.5 font-mono text-sm text-zinc-200">VITE_</code>:
      </DocParagraph>
      <DocCode
        code={`# .env (client-safe)\nVITE_CHIROGRAPH_PUBLISHABLE_KEY="<64 hex chars>"`}
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
        headers={['Environment', 'Secret key', 'Widget key']}
        rows={[
          ['Development', '64 hex chars, provisioned for a dev tenant', '64 hex chars, provisioned for a dev widget client'],
          ['Production', '64 hex chars, provisioned for a production tenant', '64 hex chars, provisioned for a production widget client'],
        ]}
      />
      <DocParagraph>
        Chirograph Verify keys do not carry test/live prefixes. Every key is 64 lowercase
        hexadecimal characters generated from 32 random bytes; separate keys for separate
        environments are still recommended.
      </DocParagraph>

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
