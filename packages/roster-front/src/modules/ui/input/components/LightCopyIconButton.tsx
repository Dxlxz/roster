import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { LightIconButton } from 'roster-ui/components/input';
import { IconCopy } from 'roster-ui/icon';
import { themeCssVariables } from 'roster-ui/theme';
import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';

const StyledButtonContainer = styled.div`
  padding: 0 ${themeCssVariables.spacing[1]};
`;

export type LightCopyIconButtonProps = {
  copyText: string;
};

export const LightCopyIconButton = ({ copyText }: LightCopyIconButtonProps) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { t } = useLingui();

  return (
    <StyledButtonContainer>
      <LightIconButton
        onClick={() => {
          copyToClipboard(copyText, t`Text copied to clipboard`);
        }}
        aria-label={t`Copy to Clipboard`}
      >
        <IconCopy />
      </LightIconButton>
    </StyledButtonContainer>
  );
};
