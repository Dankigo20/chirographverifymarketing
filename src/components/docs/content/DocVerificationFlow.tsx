import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCode, DocCallout } from '@/components/docs/DocBlocks';

export function DocVerificationFlow() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Verification Flow</DocHeading>
      <DocParagraph>
        Every Chirograph Verify verification follows a three-step flow: Challenge, Ceremony,
        and Redeem. Each step has a clear responsibility split between the customer's
        application, the customer's backend, the Chirograph API, and the widget SDK.
      </DocParagraph>

      <DocHeading level={3} id="step-1-challenge">1. Challenge</DocHeading>
      <DocCode
        code={`Customer backend
       ↓
Chirograph API
       ↓
flow_id + redirect_url`}
        language="text"
      />
      <DocParagraph>
        The customer's backend calls the Chirograph API to create a single-use verification
        flow. The API returns a <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-sm text-ink-800">flow_id</code> and
        a hosted ceremony URL.
      </DocParagraph>

      <DocHeading level={3} id="step-2-ceremony">2. Ceremony</DocHeading>
      <DocCode
        code={`Browser
       ↓
Widget SDK
       ↓
Hosted WebAuthn ceremony
       ↓
User verifies with device`}
        language="text"
      />
      <DocParagraph>
        The widget SDK redirects the browser to the Chirograph-hosted WebAuthn ceremony. The
        user authenticates using a supported authenticator (Face ID, Touch ID, or security
        key). Chirograph verifies the authentication server-side.
      </DocParagraph>

      <DocHeading level={3} id="step-3-redeem">3. Redeem</DocHeading>
      <DocCode
        code={`Browser returns opaque result
       ↓
Customer backend
       ↓
Chirograph API
       ↓
Verified result`}
        language="text"
      />
      <DocParagraph>
        The browser is redirected back to the customer's application with an opaque result
        token. The customer's backend redeems this token via the Chirograph API to obtain the
        final verification result.
      </DocParagraph>

      <DocHeading level={3} id="responsibilities">Component responsibilities</DocHeading>

      <DocHeading level={3} id="customer-app">Customer application</DocHeading>
      <DocList items={['Renders the verification UI', 'Communicates with its own backend']} />

      <DocHeading level={3} id="customer-backend">Customer backend</DocHeading>
      <DocList
        items={[
          'Holds the secret key',
          'Creates verification flows',
          'Redeems results',
          'Validates webhook events',
          'Makes the final application decision',
        ]}
      />

      <DocHeading level={3} id="chirograph-api">Chirograph API</DocHeading>
      <DocList
        items={[
          'Creates the verification flow',
          'Manages the challenge',
          'Performs verification',
          'Produces the verification result',
        ]}
      />

      <DocHeading level={3} id="widget-sdk">Widget SDK</DocHeading>
      <DocList
        items={[
          'Runs in the browser',
          'Redirects the browser to the hosted ceremony',
          'Does not make the final verification decision',
        ]}
      />

      <DocHeading level={3} id="hosted-ceremony">Hosted ceremony</DocHeading>
      <DocList items={['Performs the WebAuthn interaction']} />

      <DocCallout variant="info" title="Key principle">
        The browser is never the authority. The customer's backend creates the flow, the browser
        performs the ceremony, and the customer's backend redeems the result. The customer's
        backend decides what to do with the verification result.
      </DocCallout>
    </DocPageWrapper>
  );
}
