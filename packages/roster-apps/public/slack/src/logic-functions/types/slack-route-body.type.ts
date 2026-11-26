import { type RoutePayload } from 'roster-sdk/define';

export type SlackRouteBody = Pick<RoutePayload<unknown>, 'body'>;
