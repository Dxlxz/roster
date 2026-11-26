import { type LocalCommandDefinition } from '@/catalog/types/command-definition.type';

export const AUTH_LOGIN_COMMAND_DEFINITION: LocalCommandDefinition = {
  path: ['auth', 'login'],
  description: 'Sign in with your browser or an API key, and save the remote',
  options: [
    {
      flags: '--with-token',
      description: 'Read an API key from standard input',
    },
    {
      flags: '--url <url>',
      description: 'roster server URL, for example https://acme.roster.dev',
    },
    {
      flags: '--name <name>',
      description: 'Name of the remote to save (defaults to "default")',
    },
    { flags: '--use', description: 'Make this remote the default' },
    {
      flags: '--replace',
      description: 'Point an existing remote at a different URL',
    },
    {
      flags: '--proxy-header <header...>',
      description:
        'Header for an authenticating proxy in front of the server, as "Name: value". Repeatable; saved on the remote',
    },
    {
      flags: '--proxy-header-command <command>',
      description:
        'Shell command that prints proxy headers as "Name: value" lines, run when a request needs them; saved on the remote',
    },
  ],
  examples: [
    'roster auth login --url https://acme.roster.dev',
    'roster auth login --url https://acme.roster.dev --name prod --use',
    'printf \'%s\' "$roster_API_KEY" | roster auth login --with-token --url https://acme.roster.dev --name prod --use',
    'roster auth login --with-token --remote prod < api-key.txt',
    'roster auth login --url https://roster.example.com --proxy-header-command \'echo "cf-access-token: $(cloudflared access token -app=https://roster.example.com)"\'',
  ],
  outputModes: ['human', 'json'],
  writes: true,
  needsProject: false,
  needsTarget: false,
  load: async () =>
    (await import('@/commands/auth/login/run-auth-login-command'))
      .runAuthLoginCommand,
};
