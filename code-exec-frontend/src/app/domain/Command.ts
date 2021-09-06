import { CommandResultEntry } from './CommandResultEntry';
import { ExecutionStatus } from './enum/ExecutionStatus.enum';

export class Command {
  constructor(
    public commandQuery: string,
    public _id: string = '',
    public startTimestamp: Date | null = null,
    public endTimestamp: Date | null = null,
    public executionStatus: ExecutionStatus = ExecutionStatus.IN_PROGRESS,
    public results: Iterable<CommandResultEntry> | [] = []
  ) {
  }
}
