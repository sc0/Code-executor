import chai from 'chai';
import spies from 'chai-spies';
import ExecutorService from '../../src/services/executor.service.js';
import { CommandModel } from '../../src/models/command.model.js';
import { ResultType } from '../../src/domain/enums/resultType.enum.js'


describe("Executor service class", () => {
  describe("given proper Command", () => {
    it("is able to set all types of results", () => {
      const command = new CommandModel({
        commandQuery: 'test' 
      });
      ExecutorService.addResult(ResultType.ERROR, command, 'Error occured');
      ExecutorService.addResult(ResultType.STDOUT, command, 'Command executed');
      ExecutorService.addResult(ResultType.STDERR, command, 'Command executed incorrectly');

      chai.expect(command.results).to.be.an('array');
      chai.expect(command.results[0].stream).to.equal(ResultType.ERROR);
      chai.expect(command.results[1].stream).to.equal(ResultType.STDOUT);
      chai.expect(command.results[2].stream).to.equal(ResultType.STDERR);
    })
  })
})

