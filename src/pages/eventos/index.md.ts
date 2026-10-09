import type { APIRoute } from 'astro';
import { eventosMarkdown, markdownResponse } from '../../lib/agent-docs';

export const GET: APIRoute = () => markdownResponse(eventosMarkdown());
