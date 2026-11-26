import { type I18n } from '@lingui/core';
import { MainText } from 'src/components/MainText';
import { SubTitle } from 'src/components/SubTitle';

type WhatIsrosterProps = {
  i18n: I18n;
};

export const WhatIsroster = ({ i18n }: WhatIsrosterProps) => {
  return (
    <>
      <SubTitle value={i18n._('What is roster?')} />
      <MainText>
        {i18n._(
          "It's a CRM, a software to help businesses manage their customer data and relationships efficiently.",
        )}
      </MainText>
    </>
  );
};
