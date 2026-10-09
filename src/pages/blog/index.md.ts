import type { APIRoute } from 'astro';
import { blogMarkdown, markdownResponse } from '../../lib/agent-docs';

export const GET: APIRoute = () => markdownResponse(blogMarkdown());
