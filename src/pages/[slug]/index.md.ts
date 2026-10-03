import type { APIRoute } from 'astro';
import { markdownResponse, pageMarkdown } from '../../lib/agent-docs';
import { contentPagePaths } from '../../lib/pages';

export const getStaticPaths = contentPagePaths;

export const GET: APIRoute = ({ params, props }) =>
  markdownResponse(pageMarkdown(props.entry, `/${params.slug}/`));
