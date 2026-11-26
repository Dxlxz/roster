import { type PartnerCountryValue } from './data/partner-country-options';
import { type PartnerLanguageValue } from './data/partner-language-options';
import { type PartnerScopeValue } from './data/partner-scope-options';
import { type PartnerTeamTypeValue } from './data/partner-team-type-options';
import { type PartnerrosterExperienceValue } from './data/partner-roster-experience-options';

export type CountryFieldValue = PartnerCountryValue | '';

export type PartnerApplicationState = {
  stepIndex: number;

  // Identity
  name: string;
  email: string;
  company: string;
  website: string;

  // Profile
  linkedin: string;
  city: string;
  country: CountryFieldValue;
  languages: PartnerLanguageValue[];

  // Expertise
  typeOfTeam: PartnerTeamTypeValue | '';
  partnerScope: PartnerScopeValue[];
  skills: string[];

  // Experience (what they've built in roster)
  rosterExperience: PartnerrosterExperienceValue[];
  rosterExperienceNotes: string;
  rosterExperienceProofLink: string;

  // Commercials
  hourlyRate: string;
  projectBudgetMin: string;
  calendarLink: string;
  acceptsTerms: boolean;

  // Meta
  fieldErrors: Partial<Record<string, string>>;
  submitError: string | null;
  isSubmitting: boolean;
  isSubmitted: boolean;
};

// The scalar (string-valued) fields a single SET_FIELD action can target;
// multi-value fields (languages, partnerScope, skills, rosterExperience) have
// their own actions.
export type ScalarFieldName =
  | 'name'
  | 'email'
  | 'company'
  | 'website'
  | 'linkedin'
  | 'city'
  | 'country'
  | 'typeOfTeam'
  | 'rosterExperienceNotes'
  | 'rosterExperienceProofLink'
  | 'hourlyRate'
  | 'projectBudgetMin'
  | 'calendarLink';

export type PartnerApplicationAction =
  | { type: 'SET_FIELD'; field: ScalarFieldName; value: string }
  | { type: 'TOGGLE_SCOPE'; value: PartnerScopeValue }
  | { type: 'TOGGLE_LANGUAGE'; value: PartnerLanguageValue }
  | { type: 'TOGGLE_EXPERIENCE'; value: PartnerrosterExperienceValue }
  | { type: 'SET_SKILLS'; value: string[] }
  | { type: 'SET_ACCEPTS_TERMS'; value: boolean }
  | { type: 'GO_NEXT' }
  | { type: 'GO_BACK' }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'SET_SUBMIT_ERROR'; value: string | null }
  | { type: 'SET_SUBMITTED' }
  | { type: 'RESET' };

export const INITIAL_PARTNER_APPLICATION_STATE: PartnerApplicationState = {
  stepIndex: 0,
  name: '',
  email: '',
  company: '',
  website: '',
  linkedin: '',
  city: '',
  country: '',
  languages: [],
  typeOfTeam: '',
  partnerScope: [],
  skills: [],
  rosterExperience: [],
  rosterExperienceNotes: '',
  rosterExperienceProofLink: '',
  hourlyRate: '',
  projectBudgetMin: '',
  calendarLink: '',
  acceptsTerms: false,
  fieldErrors: {},
  submitError: null,
  isSubmitting: false,
  isSubmitted: false,
};
