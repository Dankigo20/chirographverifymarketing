import { EndpointDoc } from '@/components/docs/EndpointDoc';

export function DocApiChallenge() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/challenge"
      description="Creates a single-use verification challenge. The customer's backend calls this endpoint to initiate a verification flow. The returned flow ID and ceremony URL are used to redirect the user to the hosted WebAuthn ceremony."
      auth="Requires your secret API key (sk_live_...) sent in the X-API-Key header."
      headers={[
        ['X-API-Key', 'sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'tenant', type: 'string', required: true, description: 'The tenant identifier.' },
        { name: 'redirect_url', type: 'string', required: true, description: 'The URL to redirect the user back to after the ceremony completes.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/challenge \\
  -H "X-API-Key: $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant": "acme",
    "redirect_url": "https://yourapp.com/verified"
  }'`}
      responseExample={`{
  "flow_id": "flw_abc123...",
  "redirect_url": "https://app.chirographverify.com/widget/flow?flow_id=flw_abc123..."
}`}
      errorResponses={[
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct and has not been revoked.' },
        { status: 400, code: 'invalid_request', meaning: 'Missing or invalid parameters', action: 'Check that tenant and redirect_url are provided and valid.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry after the cooldown period.' },
        { status: 500, code: 'server_error', meaning: 'Internal server error', action: 'Retry with exponential backoff. Contact support if persistent.' },
      ]}
    />
  );
}

export function DocApiVerify() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/verify"
      description="Verifies a WebAuthn assertion server-side. This endpoint is used to validate the cryptographic assertion produced during the WebAuthn ceremony against the original challenge."
      auth="Requires your secret API key (sk_live_...) sent in the X-API-Key header."
      headers={[
        ['X-API-Key', 'sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID returned by the challenge creation.' },
        { name: 'assertion', type: 'object', required: true, description: 'The WebAuthn assertion data from the device ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/verify \\
  -H "X-API-Key: $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_id": "flw_abc123...",
    "assertion": { ... }
  }'`}
      responseExample={`{
  "verified": true,
  "trust_score": 0.95,
  "device": { ... }
}`}
      errorResponses={[
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct.' },
        { status: 400, code: 'invalid_assertion', meaning: 'The WebAuthn assertion is invalid', action: 'Ensure the assertion data is complete and unmodified.' },
        { status: 410, code: 'expired', meaning: 'The challenge has expired', action: 'Create a new challenge and restart the flow.' },
        { status: 409, code: 'already_used', meaning: 'The challenge has already been used', action: 'Create a new challenge.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
      ]}
    />
  );
}

export function DocApiWidgetFlows() {
  return (
    <EndpointDoc
      method="POST"
      path="/widget/flow"
      description="Creates a widget verification flow. This endpoint is used by the widget SDK integration to create a flow that the browser will be redirected to for the hosted ceremony."
      auth="Uses a separate, browser-safe widget key — not your secret API key. Never send your secret API key from the browser."
      headers={[
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'tenant', type: 'string', required: true, description: 'The tenant identifier.' },
        { name: 'redirect_url', type: 'string', required: true, description: 'The URL to redirect back to after the ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/widget/flow \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant": "acme",
    "redirect_url": "https://yourapp.com/verified"
  }'`}
      comingSoon
      comingSoonNote="The exact response schema and widget-key header format for POST /widget/flow are pending backend confirmation. This page will be updated when the widget-key provisioning flow is finalized."
      errorResponses={[
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid widget key', action: 'Verify that you are using your widget key, not your secret API key.' },
        { status: 403, code: 'origin_not_allowed', meaning: 'The request origin is not in the allowed origins list', action: 'Add the origin to your tenant\'s allowed widget origins.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
      ]}
    />
  );
}

export function DocApiCeremonyOptions() {
  return (
    <EndpointDoc
      method="POST"
      path="/widget/ceremony"
      description="Runs the hosted WebAuthn ceremony for a widget flow. The browser is redirected here by the widget SDK: the hosted page fetches the ceremony options for the user's device, the device performs the WebAuthn authentication, and the server verifies the assertion and produces an opaque result token for redemption. This is not an endpoint your backend calls directly."
      auth="Called during the hosted ceremony using the flow context and a browser-safe widget key. Does not require your secret API key."
      headers={[
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID for the ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/widget/ceremony \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_id": "flw_abc123..."
  }'`}
      comingSoon
      comingSoonNote="The exact response schema for POST /widget/ceremony (assertion submission and result-token issuance) is pending backend confirmation. This page will be updated when the implementation is confirmed."
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing or invalid parameters', action: 'Check that flow_id is provided.' },
        { status: 410, code: 'expired', meaning: 'The flow has expired', action: 'Create a new flow.' },
        { status: 409, code: 'already_used', meaning: 'The flow has already been completed', action: 'Create a new flow.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
      ]}
    />
  );
}

export function DocApiCeremonyComplete() {
  // Alias: POST /widget/ceremony covers the full hosted ceremony (options,
  // assertion verification, and result-token issuance) in one endpoint. This
  // keeps the old /docs/api-ceremony-complete slug working while reflecting the
  // single real endpoint.
  return DocApiCeremonyOptions();
}

export function DocApiWidgetRedeem() {
  return (
    <EndpointDoc
      method="POST"
      path="/widget/redeem"
      description="Redeems an opaque verification result token. The customer's backend calls this endpoint to exchange the opaque result token (returned to the browser after the ceremony) for the final verification result. This is the authoritative step that confirms whether a user was verified."
      auth="Requires your secret API key (sk_live_...) sent in the X-API-Key header."
      headers={[
        ['X-API-Key', 'sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID returned by the challenge creation.' },
        { name: 'result_token', type: 'string', required: true, description: 'The opaque result token returned to the browser after the ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/widget/redeem \\
  -H "X-API-Key: $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_id": "flw_abc123...",
    "result_token": "res_xyz789..."
  }'`}
      responseExample={`{
  "verified": true,
  "trust_score": 0.95,
  "device": {
    "fingerprint_hash": "fp_..."
  }
}`}
      errorResponses={[
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct.' },
        { status: 400, code: 'invalid_token', meaning: 'The result token is invalid', action: 'Ensure the token was not modified during transport.' },
        { status: 410, code: 'expired', meaning: 'The result token has expired', action: 'Create a new flow and restart the verification.' },
        { status: 409, code: 'already_redeemed', meaning: 'The result token has already been redeemed', action: 'The token is single-use. Create a new flow if re-verification is needed.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
      ]}
    />
  );
}
