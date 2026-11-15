import { EndpointDoc } from '@/components/docs/EndpointDoc';

export function DocApiChallenge() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/challenge"
      description="Creates a single-use verification challenge. The customer's backend calls this endpoint to initiate a verification flow. The returned challenge_id and challenge_url are used to redirect the user to the hosted WebAuthn ceremony."
      auth="Requires your secret API key (64 hexadecimal characters) sent in the X-API-Key header."
      headers={[
        ['X-API-Key', '64 hex chars (your tenant secret)'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'tenant_id', type: 'string (UUID)', required: true, description: 'The tenant identifier (UUID). Must match the tenant associated with the API key; a mismatch is rejected.' },
        { name: 'user_reference', type: 'string', required: true, description: 'A stable identifier for the user (e.g., email or internal user ID). Max 256 characters.' },
        { name: 'redirect_url', type: 'string (URL)', required: true, description: 'The URL to redirect the user back to after the ceremony completes. The challenge_id is appended as a query parameter.' },
        { name: 'purpose', type: 'string (enum)', required: true, description: 'The purpose of the verification: "register" for new user enrollment, or "authenticate" for returning users.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/challenge \\
  -H "X-API-Key: $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_reference": "user@example.com",
    "redirect_url": "https://yourapp.com/verified",
    "purpose": "authenticate"
  }'`}
      responseExample={`{
  "challenge_id": "550e8400-e29b-41d4-a716-446655440000",
  "challenge_url": "https://yourapp.com/verified?challenge_id=550e8400-e29b-41d4-a716-446655440000",
  "expires_at": "2026-10-28T15:00:00.000Z"
}`}
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing or invalid parameters', action: 'Check that tenant_id, user_reference, redirect_url, and purpose are provided and valid.' },
        { status: 400, code: 'user_not_enrolled', meaning: 'No credential is enrolled for this user with purpose=authenticate', action: 'Run a registration flow first, or use purpose=register.' },
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct and has not been revoked.' },
        { status: 403, code: 'forbidden', meaning: 'tenant_id does not match the authenticated tenant', action: 'Send the tenant_id that belongs to your API key.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry after the cooldown period.' },
        { status: 503, code: 'unavailable', meaning: 'Challenge state store unavailable', action: 'Retry with exponential backoff.' },
      ]}
    />
  );
}

export function DocApiVerify() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/verify"
      description="Verifies a WebAuthn assertion server-side. This endpoint validates the cryptographic assertion produced during the WebAuthn ceremony against the stored single-use challenge, then records the verification and returns the device trust score."
      auth="Requires your secret API key (64 hexadecimal characters) sent in the X-API-Key header."
      headers={[
        ['X-API-Key', '64 hex chars (your tenant secret)'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'challenge_id', type: 'string (UUID)', required: true, description: 'The challenge_id returned when the challenge was created.' },
        { name: 'response', type: 'object', required: true, description: 'The WebAuthn AuthenticationResponseJSON produced by the device ceremony (id, rawId, type, response).' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/verify \\
  -H "X-API-Key: $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "challenge_id": "550e8400-e29b-41d4-a716-446655440000",
    "response": {
      "id": "...",
      "rawId": "...",
      "type": "public-key",
      "response": {
        "clientDataJSON": "...",
        "authenticatorData": "...",
        "signature": "...",
        "userHandle": "..."
      }
    }
  }'`}
      responseExample={`{
  "verified": true,
  "device_trust_score": 87
}`}
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing or malformed request body', action: 'Check that challenge_id and response are present and well-formed.' },
        { status: 400, code: 'verification_failed', meaning: 'The assertion could not be verified (consumed, expired, or invalid)', action: 'Create a new challenge and restart the flow. Do not retry the same challenge.' },
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct.' },
        { status: 429, code: 'quota_exceeded', meaning: 'The tenant has reached its verification quota', action: 'Upgrade the tenant plan or wait for the quota window to reset.' },
        { status: 503, code: 'unavailable', meaning: 'Challenge state store unavailable', action: 'Retry with exponential backoff.' },
      ]}
    />
  );
}

export function DocApiWidgetFlows() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/widget/flows"
      description="Creates a widget verification flow from the browser. The widget SDK calls this endpoint with a browser-safe widget key. The backend validates the request against the widget client's allowed origins and redirect allowlist, then returns a hosted ceremony URL."
      auth="Authenticated with the browser-safe widget key in the X-Widget-Key header. Never send your secret API key from the browser."
      headers={[
        ['X-Widget-Key', '64 hex chars (your widget key)'],
        ['Origin', 'Must be one of the widget client\'s allowed origins'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'user_reference', type: 'string', required: true, description: 'A stable identifier for the user. Max 256 characters.' },
        { name: 'redirect_url', type: 'string (URL)', required: true, description: 'Must match the widget client\'s redirect allowlist.' },
        { name: 'purpose', type: 'string (enum)', required: true, description: '"register" for enrollment, or "authenticate" for returning users.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/flows \\
  -H "X-Widget-Key: $CHIROGRAPH_WIDGET_KEY" \\
  -H "Origin: https://yourapp.com" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_reference": "user@example.com",
    "redirect_url": "https://yourapp.com/verified",
    "purpose": "authenticate"
  }'`}
      responseExample={`{
  "flow_id": "flw_abc123",
  "hosted_url": "https://app.chirographverify.com/widget/flow?flow_token=...",
  "expires_at": "2026-10-28T15:00:00.000Z"
}`}
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing or invalid parameters', action: 'Check that user_reference, redirect_url, and purpose are valid.' },
        { status: 400, code: 'user_not_enrolled', meaning: 'No credential enrolled for purpose=authenticate', action: 'Enroll the user with purpose=register first.' },
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid widget key', action: 'Verify that you are using the widget key, not the secret API key.' },
        { status: 403, code: 'forbidden', meaning: 'Origin or redirect_url is not allowlisted', action: 'Add the origin and redirect URL to the widget client configuration in the dashboard.' },
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
      description="Returns the WebAuthn PublicKeyCredentialRequestOptions snapshot for a hosted widget flow. The hosted ceremony page in the browser calls this endpoint with the one-time flow token; no API key is required. The options are the exact snapshot created with the flow, never regenerated."
      auth="Authenticated by the one-time flow token only. No tenant or widget key is sent."
      headers={[
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_token', type: 'string', required: true, description: 'The one-time flow token embedded in the hosted ceremony URL.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/ceremony/options \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_token": "flow_token_from_hosted_url"
  }'`}
      responseExample={`{
  "publicKey": {
    "challenge": "...",
    "rpId": "chirographverify.com",
    "allowCredentials": [{ "id": "...", "type": "public-key" }],
    "userVerification": "required"
  }
}`}
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing flow_token', action: 'Send the flow_token from the hosted URL.' },
        { status: 400, code: 'invalid_flow', meaning: 'The flow token is invalid, expired, or already consumed', action: 'Create a new flow from your backend.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
        { status: 503, code: 'unavailable', meaning: 'Flow state store unavailable', action: 'Retry with exponential backoff.' },
      ]}
    />
  );
}

export function DocApiCeremonyComplete() {
  return (
    <EndpointDoc
      method="POST"
      path="/v1/widget/ceremony/complete"
      description="Completes the hosted WebAuthn ceremony. The hosted page submits the device's WebAuthn response together with the one-time flow token; the server verifies the assertion, consumes the flow, and issues a single-use opaque result token in the redirect URL."
      auth="Authenticated by the one-time flow token only. No tenant or widget key is sent."
      headers={[
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'flow_token', type: 'string', required: true, description: 'The one-time flow token embedded in the hosted ceremony URL.' },
        { name: 'response', type: 'object', required: true, description: 'The WebAuthn registration or authentication response produced by the device.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/ceremony/complete \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_token": "flow_token_from_hosted_url",
    "response": { "id": "...", "rawId": "...", "type": "public-key", "response": { ... } }
  }'`}
      responseExample={`{
  "redirect_url": "https://yourapp.com/verified?flow_result=opaque_token&flow_id=flw_abc123"
}`}
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing flow_token or malformed response', action: 'Submit the complete WebAuthn response for the flow.' },
        { status: 400, code: 'verification_failed', meaning: 'The ceremony could not be verified', action: 'Restart the flow. Do not reuse the flow token.' },
        { status: 400, code: 'invalid_flow', meaning: 'The flow token is invalid, expired, or already consumed', action: 'Create a new flow from your backend.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
        { status: 503, code: 'unavailable', meaning: 'Flow state store unavailable', action: 'Retry with exponential backoff.' },
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
      auth="Requires your secret API key (64 hexadecimal characters) sent in the X-API-Key header. Server-to-server only."
      headers={[
        ['X-API-Key', '64 hex chars (your tenant secret)'],
        ['Content-Type', 'application/json'],
      ]}
      bodyParams={[
        { name: 'result_token', type: 'string', required: true, description: 'The opaque result token returned to the browser in the flow_result query parameter.' },
      ]}
      requestExample={`curl -X POST https://app.chirographverify.com/v1/widget/redeem \\
  -H "X-API-Key: $CHIROGRAPH_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "result_token": "opaque_token_from_flow_result"
  }'`}
      responseExample={`{
  "flow_id": "flw_abc123",
  "verified": true,
  "device_trust_score": 87
}`}
      errorResponses={[
        { status: 400, code: 'invalid_request', meaning: 'Missing result_token', action: 'Send the result_token from the flow_result query parameter.' },
        { status: 400, code: 'invalid_result_token', meaning: 'The result token is invalid, expired, or already redeemed', action: 'Tokens are single-use. If it was already redeemed, treat the user as unverified for that attempt.' },
        { status: 401, code: 'unauthorized', meaning: 'Missing or invalid API key', action: 'Verify your secret key is correct.' },
        { status: 403, code: 'forbidden', meaning: 'The result token belongs to a different tenant', action: 'Redeem only tokens issued for your own tenant.' },
        { status: 429, code: 'rate_limited', meaning: 'Rate limit exceeded', action: 'Reduce request frequency and retry.' },
        { status: 503, code: 'unavailable', meaning: 'Result store unavailable', action: 'Retry with exponential backoff.' },
      ]}
    />
  );
}
