import type { ReactNode } from 'react';
import {
  DocPageWrapper,
  DocHeading,
  DocParagraph,
  DocList,
  DocCode,
  DocCallout,
  DocTable,
  EndpointBadge,
  ComingSoonBadge,
} from '@/components/docs/DocBlocks';

export interface EndpointDocProps {
  method: string;
  path: string;
  description: string;
  auth: string;
  headers: [string, string][];
  bodyParams: { name: string; type: string; required: boolean; description: string }[];
  requestExample: string;
  responseExample: string;
  errorResponses: { status: number; code: string; meaning: string; action: string }[];
  comingSoon?: boolean;
  comingSoonNote?: string;
  children?: ReactNode;
}

export function EndpointDoc({
  method,
  path,
  description,
  auth,
  headers,
  bodyParams,
  requestExample,
  responseExample,
  errorResponses,
  comingSoon = false,
  comingSoonNote,
  children,
}: EndpointDocProps) {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>{`${method} ${path}`}</DocHeading>
      {comingSoon && <ComingSoonBadge />}
      <DocParagraph>{description}</DocParagraph>

      <EndpointBadge method={method} path={path} />

      <DocHeading level={3} id="authentication">Authentication</DocHeading>
      <DocParagraph>{auth}</DocParagraph>

      <DocHeading level={3} id="request-headers">Request headers</DocHeading>
      <DocTable
        headers={['Header', 'Value']}
        rows={headers.map(([k, v]) => [<code className="font-mono text-sm text-ink-800">{k}</code>, v])}
      />

      <DocHeading level={3} id="request-body">Request body</DocHeading>
      {bodyParams.length > 0 ? (
        <DocTable
          headers={['Parameter', 'Type', 'Required', 'Description']}
          rows={bodyParams.map((p) => [
            <code className="font-mono text-sm text-ink-800">{p.name}</code>,
            <code className="font-mono text-sm text-ink-800">{p.type}</code>,
            p.required ? <span className="font-medium text-error-600">Yes</span> : <span className="text-ink-400">No</span>,
            p.description,
          ])}
        />
      ) : (
        <DocParagraph>This endpoint does not require a request body.</DocParagraph>
      )}

      <DocHeading level={3} id="request-example">Request example</DocHeading>
      <DocCode code={requestExample} language="bash" filename="request.sh" />

      <DocHeading level={3} id="response">Successful response</DocHeading>
      {comingSoon ? (
        <DocCallout variant="info" title="Response schema pending">
          {comingSoonNote ?? 'The exact response schema for this endpoint is pending finalization in the backend. This page will be updated when the implementation is complete.'}
        </DocCallout>
      ) : (
        <DocCode code={responseExample} language="json" filename="response.json" />
      )}

      <DocHeading level={3} id="errors">Error responses</DocHeading>
      {comingSoon && errorResponses.length === 0 ? (
        <DocCallout variant="info" title="Error schema pending">
          The exact error codes and HTTP status codes for this endpoint are pending finalization.
        </DocCallout>
      ) : (
        <DocTable
          headers={['Status', 'Code', 'Meaning', 'Recommended action']}
          rows={errorResponses.map((e) => [
            <span className="font-mono text-sm text-ink-800">{e.status}</span>,
            <code className="font-mono text-sm text-ink-800">{e.code}</code>,
            e.meaning,
            e.action,
          ])}
        />
      )}

      <DocHeading level={3} id="expiration">Expiration behavior</DocHeading>
      <DocParagraph>
        Verification challenges and flows are short-lived. A challenge that is not completed
        within the configured validity period will expire and must be recreated.
      </DocParagraph>

      <DocHeading level={3} id="replay">Replay behavior</DocHeading>
      <DocParagraph>
        Each challenge and result is single-use. A challenge or result that has already been
        used or redeemed cannot be reused. Replay attempts are rejected.
      </DocParagraph>

      <DocHeading level={3} id="rate-limits">Rate-limit behavior</DocHeading>
      <DocParagraph>
        This endpoint is subject to rate limiting. Limits vary by plan and may result in
        temporary throttling if exceeded. See the{' '}
        <code className="font-mono text-sm text-ink-800">429</code> error response for details.
      </DocParagraph>

      <DocHeading level={3} id="security-notes">Security notes</DocHeading>
      <DocList
        items={[
          'This endpoint requires the secret API key — never call it from browser code',
          'All communication occurs over HTTPS',
          'Requests are authenticated and rate-limited per tenant',
        ]}
      />

      {children}
    </DocPageWrapper>
  );
}
