import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface SeoMeta {
  title: string;
  description?: string;
  path?: string;
  ogType?: string;
}

const SITE_URL = siteConfig.siteUrl;

function setTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo({ title, description, path = '/', ogType = 'website' }: SeoMeta) {
  useEffect(() => {
    const fullTitle = title.includes('Chirograph') ? title : `${title} · Chirograph Verify`;
    const desc = description ?? siteConfig.description;
    const url = `${SITE_URL}/#${path}`;

    document.title = fullTitle;
    setTag('name', 'description', desc);
    setLink('canonical', `${SITE_URL}${path === '/' ? '/' : `/#${path}`}`);

    // Open Graph
    setTag('property', 'og:title', fullTitle);
    setTag('property', 'og:description', desc);
    setTag('property', 'og:url', url);
    setTag('property', 'og:type', ogType);
    setTag('property', 'og:site_name', 'Chirograph Verify');

    // Twitter / X
    setTag('name', 'twitter:card', 'summary_large_image');
    setTag('name', 'twitter:title', fullTitle);
    setTag('name', 'twitter:description', desc);
    setTag('name', 'twitter:site', siteConfig.social.x.handle);
  }, [title, description, path, ogType]);
}
