import { type AskQuestionAnswer, type AskQuestionItem } from 'roster-shared/ai';

export type AdminAskQuestionsResult = {
  questions: AskQuestionItem[];
  status: string;
  answers?: AskQuestionAnswer[];
};
