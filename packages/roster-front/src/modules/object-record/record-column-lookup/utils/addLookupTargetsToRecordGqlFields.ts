import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { type RecordGqlFields } from 'roster-shared/types';
import { isPlainObject } from 'roster-shared/utils';

export const addLookupTargetsToRecordGqlFields = ({
  recordGqlFields,
  lookupTargets,
}: {
  recordGqlFields: RecordGqlFields;
  lookupTargets: {
    relationFieldName: string;
    lookupTargetFieldMetadataItem: Pick<FieldMetadataItem, 'name'>;
  }[];
}) =>
  lookupTargets.reduce<RecordGqlFields>(
    (gqlFields, { relationFieldName, lookupTargetFieldMetadataItem }) => {
      const relationGqlFields = gqlFields[relationFieldName];

      if (!isPlainObject(relationGqlFields)) {
        return gqlFields;
      }

      return {
        ...gqlFields,
        [relationFieldName]: {
          ...relationGqlFields,
          [lookupTargetFieldMetadataItem.name]: true,
        },
      };
    },
    recordGqlFields,
  );
