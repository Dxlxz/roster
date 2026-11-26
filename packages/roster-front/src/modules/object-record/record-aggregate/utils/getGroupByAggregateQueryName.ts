import { capitalize } from 'roster-shared/utils';

export const getGroupByAggregateQueryName = ({
  objectMetadataNamePlural,
}: {
  objectMetadataNamePlural: string;
}) => {
  return `${capitalize(objectMetadataNamePlural)}GroupByAggregates`;
};
