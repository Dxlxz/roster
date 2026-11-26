import { v4 } from 'uuid';

import { type FlatAgentChatChannel } from 'src/engine/metadata-modules/flat-agent-chat-channel/types/flat-agent-chat-channel.type';
import { createEmptyFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant';
import { type FlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/flat-entity-maps.type';
import { addFlatEntityToFlatEntityMapsOrThrow } from 'src/engine/metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util';
import { STANDARD_AGENT_CHAT_CHANNEL } from 'src/engine/workspace-manager/roster-standard-application/constants/standard-agent-chat-channel.constant';
import { roster_STANDARD_APPLICATION } from 'src/engine/workspace-manager/roster-standard-application/constants/roster-standard-applications';

export const buildStandardFlatAgentChatChannelMaps = ({
  now,
  workspaceId,
  rosterStandardApplicationId,
}: {
  now: string;
  workspaceId: string;
  rosterStandardApplicationId: string;
}): FlatEntityMaps<FlatAgentChatChannel> => {
  let flatAgentChatChannelMaps = createEmptyFlatEntityMaps();

  for (const channel of Object.values(STANDARD_AGENT_CHAT_CHANNEL)) {
    flatAgentChatChannelMaps = addFlatEntityToFlatEntityMapsOrThrow({
      flatEntity: {
        id: v4(),
        universalIdentifier: channel.universalIdentifier,
        name: channel.name,
        icon: channel.icon,
        color: channel.color,
        position: channel.position,
        channelRoleIds: [],
        channelRoleUniversalIdentifiers: [],
        navigationMenuItemIds: [],
        navigationMenuItemUniversalIdentifiers: [],
        workspaceId,
        applicationId: rosterStandardApplicationId,
        applicationUniversalIdentifier:
          roster_STANDARD_APPLICATION.universalIdentifier,
        createdAt: now,
        updatedAt: now,
      },
      flatEntityMaps: flatAgentChatChannelMaps,
    });
  }

  return flatAgentChatChannelMaps;
};
