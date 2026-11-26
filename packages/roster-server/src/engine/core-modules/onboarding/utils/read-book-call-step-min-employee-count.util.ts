import { getBookCallStepMinEmployeeCount } from 'src/engine/core-modules/onboarding/utils/get-book-call-step-min-employee-count.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const readBookCallStepMinEmployeeCount = (
  rosterConfigService: rosterConfigService,
): number | null =>
  getBookCallStepMinEmployeeCount({
    calendarBookingPageId: rosterConfigService.get('CALENDAR_BOOKING_PAGE_ID'),
    minEmployeeCount: rosterConfigService.get(
      'ONBOARDING_BOOK_CALL_MIN_EMPLOYEE_COUNT',
    ),
  });
