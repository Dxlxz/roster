import { type MediaSessionMediaType } from 'roster-front-component-renderer';

export type MediaAccessSession = {
  id: string;
  ownerId: string;
  ownerName: string;
  status: 'pending' | 'capturing' | 'delegated';
  mediaTypes: MediaSessionMediaType[];
  origin?: string;
  onStop: () => void;
};
