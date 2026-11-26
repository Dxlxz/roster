import { formatAdminBillingArrangementOperator } from '@/settings/admin-panel/utils/formatAdminBillingArrangementOperator';

describe('formatAdminBillingArrangementOperator', () => {
  it('should show the full name with the email', () => {
    expect(
      formatAdminBillingArrangementOperator({
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@roster.dev',
      }),
    ).toBe('Ada Lovelace (ada@roster.dev)');
  });

  it('should fall back to the email when the name is empty', () => {
    expect(
      formatAdminBillingArrangementOperator({
        firstName: '',
        lastName: null,
        email: 'ada@roster.dev',
      }),
    ).toBe('ada@roster.dev');
  });
});
