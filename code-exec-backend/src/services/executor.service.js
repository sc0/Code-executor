import { exec } from 'child_process';
import { CommandResultEntry } from '../domain/commandResultEntry.js';
import { CommandResultEntryModel } from '../models/commandResultEntry.model.js';
import { ExecutionStatus } from '../domain/enums/executionStatus.enum.js';
import { ResultType } from '../domain/enums/resultType.enum.js';

class ExecutorService { 

  execute(command) { 
    return exec(command.commandQuery, async (error, stdout, stderr) => {
      if (error) {
        console.log(`Error while executing command: ${error.message}`);
        command.executionStatus = ExecutionStatus.ERROR;
        this.addResult(ResultType.ERROR, command, error.message);
      }

      if (stderr) { 
        console.log(`Stderr: ${stderr}`);
        this.addResult(ResultType.STDERR, command, stderr);
      }

      if (stdout) {
        console.log(`Stdout: ${stdout}`);
        command.executionStatus = ExecutionStatus.FINISHED;
        this.addResult(ResultType.STDOUT, command, stdout);
      }

      await command.save();
    });
  }

  async addResult(resultType, command, message) { 
    const resultData = new CommandResultEntry(resultType, message);
    const resultModel = new CommandResultEntryModel(resultData);
    command.results.push(resultModel);
  }
}

export default new ExecutorService();
