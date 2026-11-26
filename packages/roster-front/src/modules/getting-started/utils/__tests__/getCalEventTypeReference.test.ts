import { getCalEventTypeReference } from '@/getting-started/utils/getCalEventTypeReference';

describe('getCalEventTypeReference', () => {
  it('should read a team event type', () => {
    expect(getCalEventTypeReference('team/roster/talk-to-us')).toEqual({
      teamSlug: 'roster',
      eventTypeSlug: 'talk-to-us',
    });
  });

  it('should read a user event type', () => {
    expect(getCalEventTypeReference('jane/intro')).toEqual({
      username: 'jane',
      eventTypeSlug: 'intro',
    });
  });

  it.each(['roster', 'team/roster', 'jane/intro/extra', ''])(
    'should reject the malformed booking page id "%s"',
    (calendarBookingPageId) => {
      expect(getCalEventTypeReference(calendarBookingPageId)).toBeNull();
    },
  );
});
