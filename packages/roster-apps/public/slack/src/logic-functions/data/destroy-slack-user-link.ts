import { type CoreApiClient } from 'roster-client-sdk/core';

export const destroySlackUserLink = async (
  client: CoreApiClient,
  { id }: { id: string },
): Promise<void> => {
  await client.mutation({
    destroySlackUserLink: {
      __args: { id },
      id: true,
    },
  });
};
