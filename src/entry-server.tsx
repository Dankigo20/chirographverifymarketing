import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { seo, docsSeo } from './config/seo';
import { allDocPages } from './config/docs';

export function render(url: string): string {
  return renderToString(<App />);
}

export function getSeo(path: string): { title: string; description: string; path: string } {
  if (path === '/' || path === '') return seo.home;
  if (path === '/docs' || path === '/docs/') {
    const seo = docsSeo('introduction', 'Introduction');
    return { ...seo, path: '/docs' };
  }
  if (path.startsWith('/docs/')) {
    const slug = path.slice('/docs/'.length);
    const page = allDocPages.find((item) => item.slug === slug);
    return docsSeo(slug, page?.title ?? 'Documentation');
  }
  const key = path.slice(1) as keyof typeof seo;
  return seo[key] ?? seo.home;
}
