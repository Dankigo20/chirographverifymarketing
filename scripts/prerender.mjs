import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = join(root, 'dist');
const serverDir = join(root, 'dist-server');
const templatePath = join(distDir, 'index.html');

const routes = [
  '/',
  '/security',
  '/developers',
  '/pricing',
  '/terms',
  '/privacy',
  '/cookies',
  '/docs',
  '/docs/introduction',
  '/docs/quick-start',
  '/docs/authentication',
  '/docs/environment-variables',
  '/docs/verification-flow',
  '/docs/hosted-ceremony',
  '/docs/redeeming-the-result',
  '/docs/webhooks',
  '/docs/api-challenge',
  '/docs/api-verify',
  '/docs/api-widget-flows',
  '/docs/api-ceremony-options',
  '/docs/api-ceremony-complete',
  '/docs/api-widget-redeem',
  '/docs/node-sdk',
  '/docs/widget-sdk',
  '/docs/security-model',
  '/docs/api-keys',
  '/docs/replay-protection',
  '/docs/device-trust',
  '/docs/webhook-security',
  '/docs/errors',
  '/docs/faq',
  '/docs/changelog',
];

function setupGlobals(path) {
  const location = {
    pathname: path,
    search: '',
    hash: '',
    href: `https://chirographverify.com${path}`,
    origin: 'https://chirographverify.com',
  };
  const windowObject = {
    location,
    history: { pushState() {}, replaceState() {} },
    scrollTo() {},
    addEventListener() {},
    removeEventListener() {},
  };

  Object.defineProperty(global, 'window', {
    value: windowObject,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(global, 'document', {
    value: {
      head: { querySelector() { return null; }, appendChild() {} },
      createElement() { return { setAttribute() {}, appendChild() {} }; },
      body: { style: {} },
    },
    writable: true,
    configurable: true,
  });
  Object.defineProperty(global, 'navigator', {
    value: { userAgent: 'node' },
    writable: true,
    configurable: true,
  });
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) return html;
  pattern.lastIndex = 0;
  return html.replace(pattern, replacement);
}

function injectMetadata(html, seo) {
  const url = `https://chirographverify.com${seo.path === '/' ? '/' : seo.path.endsWith('/') ? seo.path : `${seo.path}/`}`;
  let output = html;

  output = replaceTag(output, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  output = replaceTag(output, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(seo.description)}" />`);
  output = replaceTag(output, /<link rel="canonical" href="[^"]*"[\s\S]*?\/>/, `<link rel="canonical" href="${url}" />`);
  output = replaceTag(output, /<meta property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`);
  output = replaceTag(output, /<meta property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`);
  output = replaceTag(output, /<meta property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`);
  output = replaceTag(output, /<meta name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`);
  output = replaceTag(output, /<meta name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`);

  return output;
}

setupGlobals('/');
const serverModuleUrl = pathToFileURL(join(serverDir, 'entry-server.js')).href;
const serverModule = await import(serverModuleUrl);

const template = await readFile(templatePath, 'utf8');

for (const route of routes) {
  setupGlobals(route);
  const seo = serverModule.getSeo(route);
  const rendered = serverModule.render(route);
  const withContent = template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  const html = injectMetadata(withContent, seo);

  const outputPath =
    route === '/'
      ? join(distDir, 'index.html')
      : join(distDir, route.replace(/^\//, ''), 'index.html');

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
  console.log(`Prerendered ${route} -> ${outputPath}`);
}

// GitHub Pages fallback for unknown paths.
await writeFile(join(distDir, '404.html'), template, 'utf8');
console.log('Created dist/404.html');