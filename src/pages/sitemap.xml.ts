import type { APIRoute } from 'astro';
import { sitemapXml } from '../lib/agent-docs';

export const GET: APIRoute = () =>
  new Response(sitemapXml(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
