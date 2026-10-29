import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCode, DocCallout } from '@/components/docs/DocBlocks';

export function DocQuickStart() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Quick Start</DocHeading>
      <DocParagraph>
        Get from zero to a working verification flow. Chirograph Verify uses a
        hosted WebAuthn ceremony: your backend creates a flow, the user's browser
        is redirected to a Chirograph-hosted passkey ceremony, and your backend
        redeems the result server-side.
      </DocParagraph>

      <DocHeading level={3} id="step-0">Step 0 — Configure allowed origins</DocHeading>
      <DocParagraph>
        Before creating a widget client, add at least one allowed origin in your
        tenant dashboard. The origin is the domain where your widget will run.
      </DocParagraph>
      <DocCallout variant="info" title="Allowed origin vs redirect URL">
        The <strong>allowed origin</strong> is the domain where your page is served — it must match
        the Origin header the browser sends when starting a flow.
        The <strong>redirect URL</strong> is where the browser returns after the ceremony — it must
        be listed in the widget client's redirect allowlist. Both are configured separately.
      </DocCallout>

      <DocHeading level={3} id="step-1">Step 1 — Create a widget client and get your publishable key</DocHeading>
      <DocParagraph>
        In your tenant dashboard, go to Settings and create a widget client. The dashboard
        returns a <strong>publishable widget key</strong> exactly once — copy it immediately.
        This key is safe to use in browser code; it cannot redeem results or access tenant
        configuration.
      </DocParagraph>
      <DocCallout variant="danger" title="Widget key vs secret API key">
        <ul className="space-y-1">
          <li><strong>Publishable widget key:</strong> browser-safe, starts widget flows only.</li>
          <li><strong>Secret API key (X-API-Key):</strong> server-side only, creates challenges and redeems results. Never expose to the browser.</li>
          <li><strong>Admin API key:</strong> restricted to administrative operations.</li>
        </ul>
      </DocCallout>

      <DocHeading level={3} id="step-2">Step 2 — Install the widget SDK</DocHeading>
      <DocParagraph>
        The widget SDK is self-hosted on your Chirograph Verify domain. Load it directly in
        your page — no npm package is required:
      </DocParagraph>
      <DocCode
        code="<script src="https://YOUR-CHIROGRAPH-DOMAIN/widget.js"></script>"
        language="html"
        filename="index.html"
      />
      <DocParagraph>
        The bundle exposes a global <code className="font-mono text-sm">ChirographWidget</code>
        object with <code className="font-mono text-sm">init()</code>, <code className="font-mono text-sm">start()</code>,
        and <code className="font-mono text-sm">readFlowResult()</code>.
      </DocParagraph>

      <DocHeading level={3} id="step-3">Step 3 — Initialize the widget</DocHeading>
      <DocParagraph>
        Initialize the widget with your Chirograph domain and publishable widget key:
      </DocParagraph>
      <DocCode
        code="const widget = ChirographWidget.init({\n  baseUrl: 'https://YOUR-CHIROGRAPH-DOMAIN',\n  widgetKey: 'YOUR_PUBLISHABLE_WIDGET_KEY',\n});"
        language="ts"
        filename="widget.js"
      />
      <DocList items={[
        '<code className="font-mono text-sm">baseUrl</code> — The origin of your Chirograph Verify deployment (HTTPS required in production).',
        '<code className="font-mono text-sm">widgetKey</code> — The publishable widget key from your tenant dashboard.',
      ]} />

      <DocHeading level={3} id="step-4">Step 4 — Register a passkey</DocHeading>
      <DocParagraph>
        Use <code className="font-mono text-sm">purpose: 'register'</code> to enroll a new user's
        passkey. The browser is redirected to the hosted WebAuthn ceremony.
      </DocParagraph>
      <DocCode
        code="await widget.start({\n  userReference: 'user@example.com',\n  purpose: 'register',\n  redirectUrl: 'https://yourapp.com/auth/callback',\n});"
        language="ts"
        filename="widget.js"
      />
      <DocCallout variant="info" title="Stable user reference">
        Use the same stable identifier (email, user ID, etc.) for the same person across
        registration and authentication. The user reference is bound to the enrolled passkey.
      </DocCallout>

      <DocHeading level={3} id="step-5">Step 5 — Authenticate a returning user</DocHeading>
      <DocParagraph>
        Use <code className="font-mono text-sm">purpose: 'authenticate'</code> for returning users.
        The user must already have a passkey enrolled (via the register flow).
      </DocParagraph>
      <DocCode
        code="await widget.start({\n  userReference: 'user@example.com',\n  purpose: 'authenticate',\n  redirectUrl: 'https://yourapp.com/auth/callback',\n});"
        language="ts"
        filename="widget.js"
      />
      <DocCallout variant="warning" title="user_not_enrolled">
        If the user has not enrolled a passkey, the widget returns a
        <code className="font-mono text-sm">user_not_enrolled</code> error.
        Direct the user to complete registration first.
      </DocCallout>

      <DocHeading level={3} id="step-6">Step 6 — Handle the callback</DocHeading>
      <DocParagraph>
        After the ceremony, the browser is redirected to your allowlisted callback URL with
        <code className="font-mono text-sm">flow_result</code> and <code className="font-mono text-sm">flow_id</code>
        query parameters. Use <code className="font-mono text-sm">readFlowResult()</code> to read them:
      </DocParagraph>
      <DocCode
        code="const { flowResult, flowId } = ChirographWidget.readFlowResult();\n\n// flowResult is an opaque token — send it to your backend for redemption\n// flowId identifies the verification flow"
        language="ts"
        filename="callback.js"
      />
      <DocCallout variant="danger" title="flow_result is not proof of verification">
        Possession of <code className="font-mono text-sm">flow_result</code> in the URL is not
        sufficient to consider a user verified. Always redeem the token server-side before
        acting on the result.
      </DocCallout>

      <DocHeading level={3} id="step-7">Step 7 — Redeem the result server-side</DocHeading>
      <DocParagraph>
        Forward the result token to your trusted backend and redeem it via the Chirograph API:
      </DocParagraph>
      <DocCode
        code="// Server-side — never expose your secret API key in browser code\nconst response = await fetch('https://YOUR-CHIROGRAPH-DOMAIN/v1/widget/redeem', {\
  method: 'POST',\n  headers: {\
    'X-API-Key': 'YOUR_TENANT_SECRET_API_KEY',\n    'Content-Type': 'application/json',\n  },\
  body: JSON.stringify({\
    result_token: flowResult,\
  }),\n});\n\nconst result = await response.json();\n// result: { verified: boolean, flow_id: string, device_trust_score?: number }"
        language="ts"
        filename="redeem.ts"
      />
      <DocList items={[
        '<code className="font-mono text-sm">verified</code> — Whether the WebAuthn assertion was valid.',
        '<code className="font-mono text-sm">flow_id</code> — The verification flow identifier.',
        '<code className="font-mono text-sm">device_trust_score</code> — A numeric trust score (when available).',
      ]} />
      <DocCallout variant="danger" title="Result token is single-use">
        Each result token can be redeemed only once and expires after a short window.
        Reusing or replaying a token returns <code className="font-mono text-sm">400 invalid_result_token</code>.
      </DocCallout>

      <DocHeading level={3} id="limitations">Limitations to know before launch</DocHeading>
      <DocList items={[
        'The widget SDK is self-hosted at <code className="font-mono text-sm">YOUR-CHIROGRAPH-DOMAIN/widget.js</code> — no public npm package is currently published.',
        'The Bolt dashboard JSON API can create widget clients and configure allowed origins, but does not yet expose list/edit for existing widget clients. Existing widget-client allowlist editing is available through the legacy server-rendered dashboard.',
        'Production dashboard email delivery is not yet implemented (NoopEmailSender).',
        'Recurring billing is not implemented; one-time payments via Flutterwave require server-side configuration.',
      ]} />
    </DocPageWrapper>
  );
}
