import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import NextImage from 'next/image';

import { HalftoneModel } from '@/platform/visuals/rigs/HalftoneModel';
import { radius } from '@/tokens';

import { WHY_roster_HERO } from './why-roster-visual-config';

// The /why-roster hero: a textured backdrop with the halftone "20" floating
// over it in a fixed 462px stage. Decorative — the hero heading carries the
// meaning — so the whole frame is hidden from assistive tech.
const VisualFrame = styled.div`
  border-radius: ${radius(1)};
  height: 462px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const BackgroundLayer = styled.div`
  inset: 0;
  position: absolute;
  z-index: 0;
`;

const ForegroundLayer = styled.div`
  inset: 0;
  position: absolute;
  z-index: 1;
`;

const backgroundImageClassName = css`
  object-fit: cover;
  object-position: center;
`;

export function WhyrosterVisual() {
  return (
    <VisualFrame aria-hidden>
      <BackgroundLayer>
        <NextImage
          alt=""
          className={backgroundImageClassName}
          fill
          priority
          sizes="100vw"
          src="/images/why-roster/hero/background.webp"
        />
      </BackgroundLayer>
      <ForegroundLayer>
        <HalftoneModel
          initialPose={WHY_roster_HERO.initialPose}
          modelUrl={WHY_roster_HERO.modelUrl}
          priority
          settings={WHY_roster_HERO.settings}
        />
      </ForegroundLayer>
    </VisualFrame>
  );
}
