import { type CodeExecutionData } from 'roster-shared/ai';

export type CodeExecutionStreamEmitter = (data: CodeExecutionData) => void;
