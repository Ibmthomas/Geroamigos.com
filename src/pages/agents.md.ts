import type { APIRoute } from 'astro';
import { agentsMd, markdownResponse } from '../lib/agent-docs';

export const GET: APIRoute = () => markdownResponse(agentsMd());
