import { type FrontComponentExecutionContext } from 'roster-sdk/front-component';
import { fastDeepEqual } from 'roster-shared/utils';

export const reuseUnchangedExecutionContextValues = ({
  previousExecutionContext,
  nextExecutionContext,
}: {
  previousExecutionContext: FrontComponentExecutionContext;
  nextExecutionContext: FrontComponentExecutionContext;
}): FrontComponentExecutionContext =>
  Object.fromEntries(
    Object.entries(nextExecutionContext).map(([key, nextValue]) => {
      const previousValue =
        previousExecutionContext[key as keyof FrontComponentExecutionContext];

      return [
        key,
        fastDeepEqual(previousValue, nextValue) ? previousValue : nextValue,
      ];
    }),
  ) as FrontComponentExecutionContext;
