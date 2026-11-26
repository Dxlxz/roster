'use client';

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { ChipMultiSelect, Field, TextareaField, TextField } from '@/ui';

import { PARTNER_roster_EXPERIENCE_OPTIONS } from '../../data/partner-roster-experience-options';
import { PARTNER_APPLICATION_COPY } from '../../partner-application-copy';
import { type PartnerApplicationController } from '../../use-partner-application-state';

const FIELDS = PARTNER_APPLICATION_COPY.fields;

export function ExperienceStep({
  controller,
}: {
  controller: PartnerApplicationController;
}) {
  const { i18n } = useLingui();
  const { setField, state, toggleExperience } = controller;

  const experienceOptions = PARTNER_roster_EXPERIENCE_OPTIONS.map((option) => ({
    label: i18n._(option.label),
    value: option.value,
  }));

  return (
    <>
      <Field
        hint={i18n._(FIELDS.rosterExperienceHint)}
        label={i18n._(FIELDS.rosterExperience)}
      >
        <ChipMultiSelect
          ariaLabel={i18n._(FIELDS.rosterExperience)}
          invalid={state.fieldErrors.rosterExperience !== undefined}
          onToggle={toggleExperience}
          options={experienceOptions}
          values={state.rosterExperience}
        />
      </Field>
      <Field
        hint={i18n._(FIELDS.rosterExperienceNotesHint)}
        label={i18n._(FIELDS.rosterExperienceNotes)}
      >
        <TextareaField
          ariaLabel={i18n._(FIELDS.rosterExperienceNotes)}
          invalid={state.fieldErrors.rosterExperienceNotes !== undefined}
          name="rosterExperienceNotes"
          onValueChange={(value) => setField('rosterExperienceNotes', value)}
          placeholder={i18n._(FIELDS.rosterExperienceNotesPlaceholder)}
          value={state.rosterExperienceNotes}
        />
      </Field>
      <Field
        hint={i18n._(FIELDS.rosterExperienceProofLinkHint)}
        label={i18n._(FIELDS.rosterExperienceProofLink)}
      >
        <TextField
          ariaLabel={i18n._(FIELDS.rosterExperienceProofLink)}
          inputMode="url"
          invalid={state.fieldErrors.rosterExperienceProofLink !== undefined}
          name="rosterExperienceProofLink"
          onValueChange={(value) =>
            setField('rosterExperienceProofLink', value)
          }
          placeholder={i18n._(msg`https://`)}
          value={state.rosterExperienceProofLink}
        />
      </Field>
    </>
  );
}
