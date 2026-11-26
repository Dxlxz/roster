import { type AgentResponseFormat } from 'roster-shared/ai';
import { isDefined } from 'roster-shared/utils';
import { type BaseOutputSchemaV2 } from 'roster-shared/workflow';

import { generateFakeValue } from 'src/engine/utils/generate-fake-value';

export const computeAiAgentOutputSchema = (
  responseFormat?: AgentResponseFormat | null,
): BaseOutputSchemaV2 => {
  if (responseFormat?.type !== 'json') {
    return {
      response: {
        label: 'Response',
        isLeaf: true,
        type: 'string',
        value: 'Response of the agent',
      },
    };
  }

  return Object.fromEntries(
    Object.entries(responseFormat.schema.properties ?? {}).map(
      ([name, property]) => [
        name,
        {
          isLeaf: true,
          type: property.type,
          label: name,
          ...(isDefined(property.description)
            ? { description: property.description }
            : {}),
          value: generateFakeValue(property.type),
        },
      ],
    ),
  );
};
