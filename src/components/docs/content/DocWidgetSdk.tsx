import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocList, ComingSoonBadge } from '@/components/docs/DocBlocks';

export function DocWidgetSdk() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Browser Widget SDK</DocHeading>
      <DocParagraph>
        The browser widget SDK is a lightweight JavaScript library that redirects the user's
        browser to the Chirograph-hosted WebAuthn ceremony and returns them to your application
        after verification.
      </DocParagraph>

      <DocHeading level={3} id="installation">Installation</DocHeading>
      <DocParagraph>
        Install via npm:
      </DocParagraph>
      <DocCode code="npm install @chirograph/verify-widget" language="bash" filename="terminal" />
      <DocParagraph>
        Or load via CDN:
      </DocParagraph>
      <DocCode
        code={`<script src="https://cdn.chirographverify.com/widget.js"></script>`}
        language="html"
        filename="index.html"
      />

      <DocHeading level={3} id="publishable-key">Publishable key</DocHeading>
      <DocParagraph>
        The widget SDK uses your <strong>publishable key</strong> — not your secret key. The
        publishable key is safe for browser use and cannot be used to redeem results or access
        tenant configuration.
      </DocParagraph>
      <DocCallout variant="danger" title="Never put sk_live_... in the browser">
        Only the publishable key (<code className="font-mono text-sm">pk_live_...</code>) may be
        used client-side. The secret key must never appear in frontend JavaScript.
      </DocCallout>

      <DocHeading level={3} id="initialization">Initialization</DocHeading>
      <DocComingSoonNote />
      <DocCode
        code={`// Using the CDN script
Chirograph.verify({
  publishableKey: 'pk_live_...',
  flowId: flowId, // from your backend
  // The browser is redirected to the hosted
  // WebAuthn ceremony, then back to your app
});`}
        language="ts"
        filename="widget.ts"
      />

      <DocHeading level={3} id="flow">Verification flow</DocHeading>
      <DocList
        ordered
        items={[
          'Your backend creates a flow and sends the flow ID to the frontend',
          'The widget SDK redirects the browser to the hosted ceremony',
          'The user authenticates with their device (Face ID, Touch ID, or security key)',
          'The browser is redirected back to your redirect_url with an opaque result token',
          'Your backend redeems the result token server-side',
        ]}
      />

      <DocHeading level={3} id="redirect">Redirect behavior</DocHeading>
      <DocParagraph>
        The widget performs a top-level browser redirect. It is not an iframe, modal, or inline
        component. After the ceremony, the browser returns to your{' '}
        <code className="font-mono text-sm text-ink-800">redirect_url</code> with the result
        token appended as a query parameter.
      </DocParagraph>

      <DocHeading level={3} id="result-handling">Result handling</DocHeading>
      <DocParagraph>
        On your redirect page, extract the result token from the URL and send it to your
        backend for redemption:
      </DocParagraph>
      <DocCode
        code={`// On your redirect page (e.g. /verified)
const params = new URLSearchParams(window.location.search);
const resultToken = params.get('result_token');

// Send to your backend for server-side redemption
await fetch('/api/verify-result', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ result_token: resultToken }),
});`}
        language="ts"
        filename="verified.ts"
      />

      <DocHeading level={3} id="unsupported">Unsupported browser behavior</DocHeading>
      <DocParagraph>
        If the user's browser does not support WebAuthn, or no authenticator is available, the
        ceremony will fail. The user will be redirected back to your application with an error
        result. Your application should handle this case and provide an appropriate fallback or
        message.
      </DocParagraph>
    </DocPageWrapper>
  );
}

function DocComingSoonNote() {
  return (
    <>
      <ComingSoonBadge />
      <DocCallout variant="info" title="SDK reference pending publication">
        The <code className="font-mono text-sm">@chirograph/verify-widget</code> npm package and
        CDN script are planned but not yet published. The API surface shown below represents the
        intended integration. When the SDK is published, this page will be updated with complete
        configuration options, callbacks, and error handling.
      </DocCallout>
    </>
  );
}
