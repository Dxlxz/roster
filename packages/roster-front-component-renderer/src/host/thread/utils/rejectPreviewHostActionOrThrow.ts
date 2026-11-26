import { CustomError } from 'roster-shared/utils';

export const rejectPreviewHostActionOrThrow = async (): Promise<never> => {
  throw new CustomError(
    'Host actions are unavailable in component previews.',
    'FRONT_COMPONENT_PREVIEW_HOST_ACTION_UNAVAILABLE',
  );
};
