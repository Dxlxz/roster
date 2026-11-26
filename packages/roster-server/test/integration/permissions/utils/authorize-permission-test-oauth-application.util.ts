import { findManyApplications } from 'test/integration/graphql/utils/find-many-applications.util';
import { loginAsrosterCli } from 'test/integration/metadata/suites/application/utils/login-as-roster-cli.util';
import { isDefined } from 'roster-shared/utils';

export const authorizePermissionTestOauthApplicationOrThrow = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  await loginAsrosterCli(accessToken);

  const { data } = await findManyApplications({
    gqlFields: 'id requestedRoleId',
    expectToFail: false,
    accessToken,
  });

  const oauthOnlyApplication = data.findManyApplications.find(
    ({ requestedRoleId }) => !isDefined(requestedRoleId),
  );

  if (!isDefined(oauthOnlyApplication)) {
    throw new Error('No application without a default role was found');
  }

  return oauthOnlyApplication.id;
};
