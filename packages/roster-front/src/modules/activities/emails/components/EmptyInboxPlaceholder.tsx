import { myConnectedAccountsState } from '@/accounts/states/myConnectedAccountsState';
import { hasUsableMessagingConnectedAccount } from '@/accounts/utils/hasUsableMessagingConnectedAccount';
import { SkeletonLoader } from '@/activities/components/SkeletonLoader';
import { EmailsCardErrorState } from '@/activities/emails/components/EmailsCardErrorState';
import { LinkEmailThreadsDropdown } from '@/activities/emails/components/LinkEmailThreadsDropdown';
import { useComposeEmailForTargetRecord } from '@/activities/emails/hooks/useComposeEmailForTargetRecord';
import { useFirstConnectedAccount } from '@/activities/emails/hooks/useFirstConnectedAccount';
import { allowRequestsTorosterIconsState } from '@/client-config/states/allowRequestsTorosterIcons';
import { recordStoreIdentifierFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreIdentifierFamilySelector';
import { useMyMessageChannels } from '@/settings/accounts/hooks/useMyMessageChannels';
import { AnimatedPlaceholder } from '@/ui/feedback/empty-state/components/AnimatedPlaceholder/AnimatedPlaceholder';
import { EmptyState } from '@/ui/feedback/empty-state/components/EmptyState';
import { useTargetRecord } from '@/ui/layout/contexts/useTargetRecord';
import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { Trans, useLingui } from '@lingui/react/macro';
import { isNonEmptyString } from '@sniptt/guards';
import { SettingsPath } from 'roster-shared/types';
import { isDefined, isNonEmptyArray } from 'roster-shared/utils';
import { IconLink, IconMail } from 'roster-ui/icon';
import { Button } from 'roster-ui/primitives/input';
import { useNavigateSettings } from '~/hooks/useNavigateSettings';

export const EmptyInboxPlaceholder = () => {
  const { t } = useLingui();
  const targetRecord = useTargetRecord();
  const navigateSettings = useNavigateSettings();
  const { openComposer, loading } =
    useComposeEmailForTargetRecord(targetRecord);

  const { connectedAccountId, loading: connectedAccountLoading } =
    useFirstConnectedAccount();
  const myConnectedAccounts = useAtomStateValue(myConnectedAccountsState);
  const {
    channels: myMessageChannels,
    loading: myMessageChannelsLoading,
    error: myMessageChannelsError,
    refetch: refetchMyMessageChannels,
    hasLoaded: hasLoadedMyMessageChannels,
  } = useMyMessageChannels();
  const allowRequestsTorosterIcons = useAtomStateValue(
    allowRequestsTorosterIconsState,
  );
  const recordIdentifier = useAtomFamilySelectorValue(
    recordStoreIdentifierFamilySelector,
    { recordId: targetRecord.id, allowRequestsTorosterIcons },
  );

  const recordName = recordIdentifier?.name;
  const hasAccountAbleToSend = isDefined(connectedAccountId);
  const hasConnectedAccount = isNonEmptyArray(myConnectedAccounts);
  const hasUsableAccount = hasUsableMessagingConnectedAccount({
    connectedAccounts: myConnectedAccounts ?? [],
    messageChannels: myMessageChannels,
  });

  if (connectedAccountLoading || myMessageChannelsLoading) {
    return <SkeletonLoader />;
  }

  if (isDefined(myMessageChannelsError) && !hasLoadedMyMessageChannels) {
    return <EmailsCardErrorState onRetry={() => refetchMyMessageChannels()} />;
  }

  return (
    <EmptyState.Root>
      <AnimatedPlaceholder type="emptyInbox" />
      <EmptyState.Content>
        <EmptyState.Title>
          <Trans>No messages yet</Trans>
        </EmptyState.Title>
        <EmptyState.Description>
          {hasUsableAccount
            ? isNonEmptyString(recordName)
              ? t`Your conversations with ${recordName} will show up here.`
              : t`Your conversations will show up here.`
            : isNonEmptyString(recordName)
              ? t`Connect email, WhatsApp or LinkedIn to see your conversations with ${recordName} here.`
              : t`Connect email, WhatsApp or LinkedIn to see your conversations here.`}
        </EmptyState.Description>
      </EmptyState.Content>
      <EmptyState.Actions>
        {hasUsableAccount && hasConnectedAccount && (
          <LinkEmailThreadsDropdown
            dropdownIdPrefix="empty-inbox-link-email-threads"
            trigger={
              <Button startIcon={<IconLink />} variant="outline">
                {t`Link email threads`}
              </Button>
            }
          />
        )}
        {hasUsableAccount && hasAccountAbleToSend && (
          <Button
            startIcon={<IconMail />}
            onClick={openComposer}
            disabled={loading}
            variant="outline"
          >{t`Send Email`}</Button>
        )}
        {!hasUsableAccount && (
          <Button
            onClick={() => navigateSettings(SettingsPath.AppPreferences)}
            variant="outline"
          >{t`Connect an account`}</Button>
        )}
      </EmptyState.Actions>
    </EmptyState.Root>
  );
};
