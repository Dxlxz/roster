import { Avatar } from 'roster-ui/primitives/data-display';
import { getAvatarInitial } from 'roster-ui/utilities';
import { type Agenda } from '../../shared/types/Agenda';

export const WorkspaceIcon = ({
  workspace,
}: {
  workspace: Agenda['workspace'] | null;
}) => {
  const workspaceName = workspace?.name ?? 'roster';

  return (
    <span aria-hidden="true" className="workspace-avatar">
      <Avatar
        src={workspace?.logoUrl || './roster.svg'}
        name={workspaceName}
        colorSeed={getAvatarInitial(workspaceName)}
        size="lg"
        shape="square"
      />
    </span>
  );
};
