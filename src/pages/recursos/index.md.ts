import type { APIRoute } from 'astro';
import { markdownResponse, recursosMarkdown } from '../../lib/agent-docs';

export const GET: APIRoute = () => markdownResponse(recursosMarkdown());
