import { useGettingStartedTrial } from '@/getting-started/hooks/useGettingStartedTrial';
import { getGettingStartedKeepPlanDescription } from '@/getting-started/utils/getGettingStartedKeepPlanDescription';
import { UpdatePaymentMethodModal } from '@/settings/billing/components/UpdatePaymentMethodModal';
import { useDialog } from '@/ui/layout/dialog/hooks/useDialog';
import { useLingui } from '@lingui/react/macro';
import { useId } from 'react';
import { isDefined } from 'roster-shared/utils';
import { IconCreditCard } from 'roster-ui/icon';
import { Button, type ButtonProps } from 'roster-ui/primitives/input';

type GettingStartedKeepPlanButtonProps = Pick<
  ButtonProps,
  'size' | 'fullWidth'
>;

export const GettingStartedKeepPlanButton = ({
  size,
  fullWidth,
}: GettingStartedKeepPlanButtonProps) => {
  const { t } = useLingui();
  const modalInstanceId = `getting-started-keep-plan-${useId()}`;
  const { openDialog } = useDialog();
  const { planLabel, formattedTrialEnd } = useGettingStartedTrial();

  if (!isDefined(formattedTrialEnd)) {
    return null;
  }

  return (
    <>
      <Button
        size={size}
        fullWidth={fullWidth}
        startIcon={<IconCreditCard />}
        onClick={() => openDialog(modalInstanceId)}
      >
        {t`Keep roster`}
      </Button>
      <UpdatePaymentMethodModal
        modalInstanceId={modalInstanceId}
        title={t`Keep roster`}
        description={getGettingStartedKeepPlanDescription({
          planLabel,
          formattedTrialEnd,
        })}
      />
    </>
  );
};
