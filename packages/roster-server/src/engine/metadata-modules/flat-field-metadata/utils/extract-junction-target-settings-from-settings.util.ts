import { type AllFieldMetadataSettings } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

type JunctionTargetSettings = {
  junctionTargetFieldId?: string;
};

// TODO refactor using either type predicate or FieldMetadataType discriminating union
export const extractJunctionTargetSettingsFromSettings = (
  settings: AllFieldMetadataSettings | null | undefined,
): JunctionTargetSettings => {
  if (!isDefined(settings)) {
    return {};
  }

  if (typeof settings !== 'object' || settings === null) {
    return {};
  }

  const result: JunctionTargetSettings = {};

  if (
    'junctionTargetFieldId' in settings &&
    typeof settings.junctionTargetFieldId === 'string'
  ) {
    result.junctionTargetFieldId = settings.junctionTargetFieldId;
  }

  return result;
};
