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
    const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
    const urlPath = normalizedPath === '/' ? '/' : normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
    const url = `${SITE_URL}${urlPath}`;

    document.title = fullTitle;
    setTag('name', 'description', desc);
    setLink('canonical', url);

    const imageUrl = `${SITE_URL}/favicon.svg`;

    // Open Graph
    setTag('property', 'og:title', fullTitle);
    setTag('property', 'og:description', desc);
    setTag('property', 'og:url', url);
    setTag('property', 'og:type', ogType);
    setTag('property', 'og:site_name', 'Chirograph Verify');
    setTag('property', 'og:locale', 'en_US');
    setTag('property', 'og:image', imageUrl);
    setTag('property', 'og:image:alt', 'Chirograph Verify brand mark');

    // Twitter / X
    setTag('name', 'twitter:card', 'summary_large_image');
    setTag('name', 'twitter:title', fullTitle);
    setTag('name', 'twitter:description', desc);
    setTag('name', 'twitter:site', siteConfig.social.x.handle);
    setTag('name', 'twitter:image', imageUrl);
    setTag('name', 'twitter:image:alt', 'Chirograph Verify brand mark');
  }, [title, description, path, ogType]);
}
