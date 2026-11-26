import { STANDARD_OBJECTS } from 'roster-shared/metadata';

export const isWorkflowRelatedObject = (objectMetadata: {
  universalIdentifier: string;
}): boolean =>
  objectMetadata.universalIdentifier ===
  STANDARD_OBJECTS.workflowRun.universalIdentifier;
