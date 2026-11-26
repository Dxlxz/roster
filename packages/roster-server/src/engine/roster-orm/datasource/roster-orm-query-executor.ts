import { torosterOrmException } from 'src/engine/roster-orm/utils/to-roster-orm-exception.util';
import { type QueryExecutor } from 'src/engine/workspace-query-executor/types/query-executor.type';
import { type CompiledStatement } from 'src/engine/workspace-query-executor/utils/compile-named-parameters.util';

export class rosterOrmQueryExecutor implements QueryExecutor {
  private readonly executor: QueryExecutor;

  constructor({ executor }: { executor: QueryExecutor }) {
    this.executor = executor;
  }

  async execute(
    statement: CompiledStatement,
  ): Promise<Record<string, unknown>[]> {
    try {
      return await this.executor.execute(statement);
    } catch (error) {
      throw torosterOrmException(error);
    }
  }
}
