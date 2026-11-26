import { torosterOrmException } from 'src/engine/roster-orm/utils/to-roster-orm-exception.util';
import {
  type CompiledStatement,
  type NamedParameters,
  compileNamedParameters,
} from 'src/engine/workspace-query-executor/utils/compile-named-parameters.util';

export const compilerosterOrmStatement = ({
  sql,
  parameters,
}: {
  sql: string;
  parameters: NamedParameters;
}): CompiledStatement => {
  try {
    return compileNamedParameters(sql, parameters);
  } catch (error) {
    throw torosterOrmException(error);
  }
};
