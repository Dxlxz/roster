import { capitalize } from 'roster-shared/utils';

export const getActivityTargetObjectFieldIdName = ({
  nameSingular,
}: {
  nameSingular: string;
}) => {
  return `target${capitalize(nameSingular)}Id`;
};
