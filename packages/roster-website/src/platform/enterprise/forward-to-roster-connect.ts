import { getCloudflareContext } from '@opennextjs/cloudflare';
import { isDefined } from 'roster-shared/utils';

type rosterConnectBinding = {
  fetch: (request: Request) => Promise<Response>;
};

const isrosterConnectBinding = (
  value: unknown,
): value is rosterConnectBinding =>
  isDefined(value) &&
  typeof value === 'object' &&
  'fetch' in value &&
  typeof value.fetch === 'function';

export const forwardTorosterConnect = async (
  request: Request,
): Promise<Response | null> => {
  if (process.env.roster_CONNECT_FORWARDING_ENABLED !== 'true') {
    return null;
  }

  let binding: unknown;

  try {
    const { env } = await getCloudflareContext({ async: true });

    binding = 'roster_CONNECT' in env ? env.roster_CONNECT : undefined;
  } catch (error) {
    console.error(
      '[enterprise] Cloudflare context is unavailable; answering locally',
      error,
    );

    return null;
  }

  if (!isrosterConnectBinding(binding)) {
    console.error(
      '[enterprise] roster_CONNECT_FORWARDING_ENABLED is set but the roster_CONNECT binding is missing; answering locally',
    );

    return null;
  }

  const connectUrl = new URL(request.url);

  connectUrl.pathname = connectUrl.pathname.replace(
    /^\/api\/enterprise\//,
    '/v1/enterprise/',
  );

  return binding.fetch(new Request(connectUrl, request));
};
