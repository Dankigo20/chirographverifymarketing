import { EndpointDoc } from '@/components/docs/EndpointDoc';

export function DocApiChallenge() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/challenge"
      description="Creates a single-use verification challenge. The customer's backend calls this endpoint to initiate a verification flow. The returned flow ID and ceremony URL are used to redirect the user to the hosted WebAuthn ceremony."
      auth="Requires the secret API key (sk_live_...) sent as a Bearer token in the Authorization header."
      headers={[
        ['Authorization', 'Bearer sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'tenant', type: 'string', required: true, description: 'The tenant identifier.' },
        { name: 'redirect_url', type: 'string', required: true, description: 'The URL to redirect the user back to after the ceremony completes.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/challenge \\
  -H "Authorization: Bearer $CHIROGRAPH_SECRET_KEY" \\
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
      auth="Requires the secret API key (sk_live_...) sent as a Bearer token in the Authorization header."
      headers={[
        ['Authorization', 'Bearer sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID returned by the challenge creation.' },
        { name: 'assertion', type: 'object', required: true, description: 'The WebAuthn assertion data from the device ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/verify \\
  -H "Authorization: Bearer $CHIROGRAPH_SECRET_KEY" \\
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
      path="/v1/widget/flows"
      description="Creates a widget verification flow. This endpoint is used by the widget SDK integration to create a flow that the browser will be redirected to for the hosted ceremony."
      auth="Requires the secret API key (sk_live_...) sent as a Bearer token in the Authorization header."
      headers={[
        ['Authorization', 'Bearer sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'tenant', type: 'string', required: true, description: 'The tenant identifier.' },
        { name: 'redirect_url', type: 'string', required: true, description: 'The URL to redirect back to after the ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/flows \\
  -H "Authorization: Bearer $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant": "acme",
    "redirect_url": "https://yourapp.com/verified"
  }'`}
      responseExample={`{
  "flow_id": "flw_xyz789...",
  "ceremony_url": "https://app.chirographverify.com/widget/flow?flow_id=flw_xyz789..."
}`}
      errorResponses={[
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct.' },
        { status: 400, code: 'invalid_request', meaning: 'Missing or invalid parameters', action: 'Check that tenant and redirect_url are provided.' },
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
      path="/v1/widget/ceremony/options"
      description="Returns WebAuthn ceremony options for the hosted flow. The browser uses these options to initiate the WebAuthn authentication ceremony on the user's device."
      auth="Requires the publishable key (pk_live_...) or the flow context. This endpoint is called during the hosted ceremony."
      headers={[
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID for the ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/ceremony/options \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_id": "flw_abc123..."
  }'`}
      responseExample={`{
  "publicKey": {
    "challenge": "...",
    "rpId": "chirographverify.com",
    "allowCredentials": [...],
    "userVerification": "required"
  }
}`}
      errorResponses={[
        { status: 400, code: 'invalid_flow', meaning: 'The flow ID is invalid or missing', action: 'Ensure the flow ID is correct and has not expired.' },
        { status: 410, code: 'expired', meaning: 'The flow has expired', action: 'Create a new flow.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
      ]}
    />
  );
}

export function DocApiCeremonyComplete() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/widget/ceremony/complete"
      description="Completes the hosted WebAuthn ceremony. The browser submits the WebAuthn assertion to this endpoint, which verifies it server-side and produces an opaque result token for redemption."
      auth="Called during the hosted ceremony using the flow context. Does not require the secret API key."
      headers={[
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID for the ceremony.' },
        { name: 'assertion', type: 'object', required: true, description: 'The WebAuthn assertion from the device ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/ceremony/complete \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_id": "flw_abc123...",
    "assertion": { ... }
  }'`}
      responseExample={`{
  "result_token": "res_xyz789...",
  "redirect_url": "https://yourapp.com/verified?result_token=res_xyz789..."
}`}
      errorResponses={[
        { status: 400, code: 'invalid_assertion', meaning: 'The WebAuthn assertion is invalid', action: 'The ceremony should be retried with a new challenge.' },
        { status: 410, code: 'expired', meaning: 'The flow has expired', action: 'Create a new flow.' },
        { status: 409, code: 'already_used', meaning: 'The flow has already been completed', action: 'Create a new flow.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
      ]}
    />
  );
}

export function DocApiWidgetRedeem() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/widget/redeem"
      description="Redeems an opaque verification result token. The customer's backend calls this endpoint to exchange the opaque result token (returned to the browser after the ceremony) for the final verification result. This is the authoritative step that confirms whether a user was verified."
      auth="Requires the secret API key (sk_live_...) sent as a Bearer token in the Authorization header."
      headers={[
        ['Authorization', 'Bearer sk_live_...'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_id', type: 'string', required: true, description: 'The flow ID returned by the challenge creation.' },
        { name: 'result_token', type: 'string', required: true, description: 'The opaque result token returned to the browser after the ceremony.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/redeem \\
  -H "Authorization: Bearer $CHIROGRAPH_SECRET_KEY" \\
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
