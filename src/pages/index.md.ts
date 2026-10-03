import type { APIRoute } from 'astro';
import { homeMarkdown, markdownResponse } from '../lib/agent-docs';

export const GET: APIRoute = () => markdownResponse(homeMarkdown());
