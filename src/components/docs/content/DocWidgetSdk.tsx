import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocList } from '@/components/docs/DocBlocks';

export function DocWidgetSdk() {
  return (
    <DocPageWrapper>
      <DocHeading level={1}>Browser Widget SDK</DocHeading>
      <DocParagraph>
        The browser widget SDK is a lightweight JavaScript library that redirects the user's
        browser to the Chirograph-hosted WebAuthn ceremony and returns them to your application
        after verification.
      </DocParagraph>

      <DocHeading level={3} id="installation">Installation</DocHeading>
      <DocParagraph>
        The widget SDK is self-hosted by the Chirograph Verify API and served from your
        Chirograph domain at <code className="font-mono text-sm text-zinc-200">/widget.js</code>.
        No npm package is currently published — load the script directly:
      </DocParagraph>
      <DocCode
        code={`<script src="https://app.chirographverify.com/widget.js"></script>`}
        language="html"
        filename="index.html"
      />
      <DocParagraph>
        The script exposes a global{' '}
        <code className="font-mono text-sm text-zinc-200">ChirographWidget</code> object with{' '}
        <code className="font-mono text-sm text-zinc-200">init()</code> and{' '}
        <code className="font-mono text-sm text-zinc-200">readFlowResult()</code>.
      </DocParagraph>

      <DocHeading level={3} id="publishable-key">Widget key</DocHeading>
      <DocParagraph>
        The widget SDK uses your <strong>widget key</strong> — not your secret API key. The
        widget key is 64 lowercase hexadecimal characters, safe for browser use, and bound to
        your widget client&apos;s allowed origins. It cannot be used to redeem results or access
        tenant configuration.
      </DocParagraph>
      <DocCallout variant="danger" title="Never put your secret API key in the browser">
        Only the widget key (a 64-character hexadecimal string) may be used client-side. The
        secret API key must never appear in frontend JavaScript.
      </DocCallout>

      <DocHeading level={3} id="initialization">Initialization</DocHeading>
      <DocCode
        code={`const widget = ChirographWidget.init({
  baseUrl: 'https://app.chirographverify.com',
  widgetKey: '<64-hex-widget-key>',
});

// Start a flow — this navigates the browser to the hosted ceremony
await widget.start({
  userReference: 'user@example.com',
  purpose: 'authenticate', // or 'register'
  redirectUrl: 'https://yourapp.com/verified',
});`}
        language="ts"
        filename="widget.ts"
      />

      <DocHeading level={3} id="flow">Verification flow</DocHeading>
      <DocList
        ordered
        items={[
          'Your backend creates a flow and sends the flow ID to the frontend',
          'The widget SDK requests a hosted flow and redirects the browser to the ceremony',
          'The user authenticates with their device (Face ID, Touch ID, or security key)',
          'The browser is redirected back to your redirect_url with an opaque result token',
          'Your backend redeems the result token server-side',
        ]}
      />

      <DocHeading level={3} id="redirect">Redirect behavior</DocHeading>
      <DocParagraph>
        The widget performs a top-level browser redirect. It is not an iframe, modal, or inline
        component. After the ceremony, the browser returns to your{' '}
        <code className="font-mono text-sm text-zinc-200">redirect_url</code> with the result
        token appended as a query parameter.
      </DocParagraph>

      <DocHeading level={3} id="result-handling">Result handling</DocHeading>
      <DocParagraph>
        On your redirect page, extract the result token from the URL and send it to your
        backend for redemption:
      </DocParagraph>
      <DocCode
        code={`// On your redirect page (e.g. /verified)
const { flowResult, flowId } = ChirographWidget.readFlowResult();

// flowResult is opaque — send it to your backend for redemption
await fetch('/api/verify-result', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ result_token: flowResult, flow_id: flowId }),
});`}
        language="ts"
        filename="verified.ts"
      />
      <DocCallout variant="danger" title="flow_result is not proof of verification">
        The <code className="font-mono text-sm">flow_result</code> value in the URL is an opaque
        reference, not a verification result. Always redeem it server-side via{' '}
        <code className="font-mono text-sm">POST /v1/widget/redeem</code> before acting on it.
      </DocCallout>

      <DocHeading level={3} id="unsupported">Unsupported browser behavior</DocHeading>
      <DocParagraph>
        If the user&apos;s browser does not support WebAuthn, or no authenticator is available, the
        ceremony will fail. The user will be redirected back to your application with an error
        result. Your application should handle this case and provide an appropriate fallback or
        message.
      </DocParagraph>
    </DocPageWrapper>
  );
}
