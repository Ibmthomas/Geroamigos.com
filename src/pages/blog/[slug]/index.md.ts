import type { APIRoute } from 'astro';
import { markdownResponse, postMarkdown } from '../../../lib/agent-docs';
import { postPaths } from '../../../lib/blog';

export const getStaticPaths = postPaths;

export const GET: APIRoute = ({ params, props }) =>
  markdownResponse(postMarkdown(props.entry, `/blog/${params.slug}/`));
