// Sections and data files never inline external URLs.
export const SITE_URLS: Record<
  | 'appWelcome'
  | 'calBooking'
  | 'discord'
  | 'docsApi'
  | 'docsDevelopers'
  | 'docsGettingStarted'
  | 'docsMcp'
  | 'docsSelfHost'
  | 'docsSelfHostLicense'
  | 'docsUserGuide'
  | 'github'
  | 'githubIssues'
  | 'linkedin'
  | 'trustCenter'
  | 'x',
  string
> = {
  appWelcome: 'https://app.roster.dev/welcome',
  calBooking: 'https://cal.com/forms/f7841033-0a20-4958-8c92-4e34ec128a81',
  discord: 'https://discord.gg/cx5n4Jzs57',
  docsApi: 'https://docs.roster.dev/developers/extend/api',
  docsDevelopers: 'https://docs.roster.dev/developers/introduction',
  docsGettingStarted: 'https://docs.roster.dev/getting-started/introduction',
  docsMcp: 'https://docs.roster.dev/user-guide/ai/capabilities/mcp',
  docsSelfHost:
    'https://docs.roster.dev/developers/self-host/capabilities/docker-compose',
  docsSelfHostLicense:
    'https://docs.roster.dev/user-guide/billing/capabilities/pricing-plans#get-an-organization-key',
  docsUserGuide: 'https://docs.roster.dev/user-guide/introduction',
  github: 'https://github.com/Dxlxz/roster',
  githubIssues: 'https://github.com/Dxlxz/roster/issues',
  linkedin: 'https://www.linkedin.com/company/roster',
  trustCenter: 'https://trust.roster.dev',
  x: 'https://x.com/roster',
};
