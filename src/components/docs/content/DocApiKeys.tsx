import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCode, DocCallout, DocTable } from '@/components/docs/DocBlocks';

export function DocApiKeys() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>API Keys</DocHeading>
      <DocParagraph>
        Chirograph Verify uses two types of API keys. Understanding where each key belongs and
        how to protect it is essential for a secure integration.
      </DocParagraph>

      <DocHeading level={3} id="secret-key">Secret key</DocHeading>
      <DocCode code="sk_live_..." language="text" filename="format" />
      <DocParagraph>
        The secret key is used for server-side API authentication. It can create challenges,
        redeem results, and manage tenant configuration.
      </DocParagraph>
      <DocCallout variant="danger" title="Never expose your sk_live_... secret key in frontend JavaScript">
        <ul className="space-y-1">
          <li>Never put it in browser code, HTML, or client-side JavaScript</li>
          <li>Never commit it to Git or any version control system</li>
          <li>Store it only in server-side environment variables or secrets management</li>
          <li>Rotate it immediately if you suspect it has been exposed</li>
        </ul>
      </DocCallout>

      <DocHeading level={3} id="publishable-key">Publishable key</DocHeading>
      <DocCode code="pk_live_..." language="text" filename="format" />
      <DocParagraph>
        The publishable key is used for browser and widget integration. It can initialize the
        widget SDK but cannot create challenges, redeem results, or access tenant configuration.
      </DocParagraph>

      <DocHeading level={3} id="where-they-belong">Where they belong</DocHeading>
      <DocTable
        headers={['Key', 'Environment', 'Can do', 'Cannot do']}
        rows={[
          [<code className="font-mono text-sm text-ink-800">sk_live_...</code>, 'Server only', 'Create challenges, redeem results, manage config', 'Be exposed to the browser'],
          [<code className="font-mono text-sm text-ink-800">pk_live_...</code>, 'Browser-safe', 'Initialize widget SDK', 'Create challenges, redeem results, access config'],
        ]}
      />

      <DocHeading level={3} id="rotation">Rotating keys</DocHeading>
      <DocParagraph>
        You can rotate your API keys through the tenant dashboard. When you rotate a key:
      </DocParagraph>
      <DocList
        ordered
        items={[
          'A new key is generated and the old key is immediately revoked',
          'Update your environment variables with the new key',
          'Deploy your application with the updated key',
          'Verify that all integrations are working with the new key',
        ]}
      />

      <DocHeading level={3} id="exposed">What happens if a secret is exposed</DocHeading>
      <DocParagraph>
        If your secret key is exposed (e.g., committed to a public repository, leaked in
        client-side code, or accessed by an unauthorized party), you must:
      </DocParagraph>
      <DocList
        ordered
        items={[
          'Rotate the key immediately through the dashboard',
          'Audit recent API activity for suspicious behavior',
          'Update all server-side environments with the new key',
          'Contact support@chirographverify.com if you need assistance',
        ]}
      />
    </DocPageWrapper>
  );
}
