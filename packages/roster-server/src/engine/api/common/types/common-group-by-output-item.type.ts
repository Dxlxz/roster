import { type ObjectRecord } from 'roster-shared/types';

type AggregateValues = {
  [key: string]: string;
};

type GroupByDimensionValues = {
  groupByDimensionValues: string[];
};

type Records = {
  records?: ObjectRecord[];
};

export type CommonGroupByOutputItem = GroupByDimensionValues &
  AggregateValues &
  Records;
