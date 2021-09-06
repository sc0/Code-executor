import { ResultType } from './enum/ResultType.enum';

export class CommandResultEntry {
  constructor(
    public stream: ResultType,
    public value: String,
    public timestamp: Date) {

  }
}
