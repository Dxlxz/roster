import { roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS } from 'roster-shared/application';

export const MARKETPLACE_FEATURED_APPLICATIONS: {
  universalIdentifier: string;
  sourcePackage: string;
  position?: number;
}[] = [
  {
    universalIdentifier: roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.CALL_RECORDER,
    sourcePackage: '@rosterhq/call-recorder',
    position: 1,
  },
  {
    universalIdentifier:
      roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.PEOPLE_DATA_LABS,
    sourcePackage: '@rosterhq/people-data-labs',
    position: 2,
  },
  {
    universalIdentifier: roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.LAST_CONTACT,
    sourcePackage: '@rosterhq/last-contact',
    position: 3,
  },
  {
    universalIdentifier: roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.EXA,
    sourcePackage: '@rosterhq/exa',
    position: 4,
  },
  {
    universalIdentifier: roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.SLACK,
    sourcePackage: '@rosterhq/slack',
    position: 5,
  },
  {
    universalIdentifier: roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.TEAMS,
    sourcePackage: '@rosterhq/teams',
    position: 6,
  },
  {
    universalIdentifier: roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.FATHOM,
    sourcePackage: '@rosterhq/fathom',
    position: 7,
  },
];
