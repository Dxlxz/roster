import { beforeAll } from 'vitest';

beforeAll(async () => {
  const apiUrl = process.env.roster_API_URL!;
  const token = process.env.roster_API_KEY!;

  if (!apiUrl || !token) {
    throw new Error(
      'roster_API_URL and roster_API_KEY must be set.\n' +
        'Or set them in vitest env config.',
    );
  }

  let response: Response;

  try {
    response = await fetch(`${apiUrl}/healthz`);
  } catch {
    throw new Error(
      `roster server is not reachable at ${apiUrl}. ` +
        'Make sure the server is running before executing integration tests.',
    );
  }

  if (!response.ok) {
    throw new Error(`Server at ${apiUrl} returned ${response.status}`);
  }

  process.env.roster_APP_ACCESS_TOKEN ??= token;
});
