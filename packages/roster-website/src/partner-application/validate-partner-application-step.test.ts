import { INITIAL_PARTNER_APPLICATION_STATE } from './partner-application-state';
import { validatePartnerApplicationStep } from './validate-partner-application-step';

const validExperienceNotes =
  'Built a custom roster app for a property-management client, modeled leases and ' +
  'tenants as data models, automated renewal workflows, and shipped a front component ' +
  'for the broker dashboard with role-based views.';

describe('validatePartnerApplicationStep', () => {
  it('requires experience milestones, narrative, and proof URL on Experience', () => {
    const errors = validatePartnerApplicationStep({
      ...INITIAL_PARTNER_APPLICATION_STATE,
      stepIndex: 3,
    });
    expect(errors.rosterExperience).toBe('required');
    expect(errors.rosterExperienceNotes).toBe('required');
    expect(errors.rosterExperienceProofLink).toBe('required');
  });

  it('rejects a narrative under 200 characters on Experience', () => {
    const errors = validatePartnerApplicationStep({
      ...INITIAL_PARTNER_APPLICATION_STATE,
      stepIndex: 3,
      rosterExperience: ['WORKFLOWS'],
      rosterExperienceNotes: 'Too short for a real implementation narrative.',
      rosterExperienceProofLink: 'https://www.loom.com/share/example',
    });
    expect(errors.rosterExperienceNotes).toBe('too_short');
  });

  it('rejects an invalid proof URL on Experience', () => {
    const errors = validatePartnerApplicationStep({
      ...INITIAL_PARTNER_APPLICATION_STATE,
      stepIndex: 3,
      rosterExperience: ['CUSTOM_APPS'],
      rosterExperienceNotes: validExperienceNotes,
      rosterExperienceProofLink: 'not-a-url',
    });
    expect(errors.rosterExperienceProofLink).toBe('invalid_url');
  });

  it('accepts a website typed without https:// on Identity', () => {
    const errors = validatePartnerApplicationStep({
      ...INITIAL_PARTNER_APPLICATION_STATE,
      stepIndex: 0,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      website: 'analyticalengines.example',
    });
    expect(errors).toEqual({});
  });

  it('requires the program terms on the last step', () => {
    const commercials = {
      ...INITIAL_PARTNER_APPLICATION_STATE,
      stepIndex: 4,
      hourlyRate: '150',
      projectBudgetMin: '5000',
    };
    expect(validatePartnerApplicationStep(commercials)).toEqual({
      acceptsTerms: 'terms_required',
    });
    expect(
      validatePartnerApplicationStep({ ...commercials, acceptsTerms: true }),
    ).toEqual({});
  });

  it('accepts a complete Experience step', () => {
    const errors = validatePartnerApplicationStep({
      ...INITIAL_PARTNER_APPLICATION_STATE,
      stepIndex: 3,
      rosterExperience: ['CUSTOM_APPS', 'DATA_MODELS'],
      rosterExperienceNotes: validExperienceNotes,
      rosterExperienceProofLink: 'https://www.loom.com/share/example',
    });
    expect(errors).toEqual({});
  });
});
