import chai from 'chai';
import { CommandValidator } from '../../../src/domain/validators/command.validator.js';

describe("Command validator class", () => {
  describe("validation method containsCommandQuery", () => {
    it("validates object as expected", () => {
      const badTestObject = {badProperty: true};
      const almostGoodTestObject = {commandQuery: true};
      const goodTestObject = {commandQuery: "ls"};

      const testedObject1 = new CommandValidator(badTestObject);
      const testedObject2 = new CommandValidator(almostGoodTestObject);
      const testedObject3 = new CommandValidator(goodTestObject);

      chai.expect(testedObject1.isValid()).to.be.false;
      chai.expect(testedObject2.isValid()).to.be.false;
      chai.expect(testedObject3.isValid()).to.be.true;
      
    });
  });

  it("properly identifies proper and improper objects", () => {
    const testString = "I will fail";
    const badTestObject = {};
    const anotherBadTestObject = {prop1: "value", willIPass: false};
    const goodTestObject = {commandQuery: "command"};

    const testedObject1 = new CommandValidator(testString);
    const testedObject2 = new CommandValidator(badTestObject);
    const testedObject3 = new CommandValidator(anotherBadTestObject);
    const testedObject4 = new CommandValidator(goodTestObject);

    chai.expect(testedObject1.isValid()).to.be.false;
    chai.expect(testedObject2.isValid()).to.be.false;
    chai.expect(testedObject3.isValid()).to.be.false;
    chai.expect(testedObject4.isValid()).to.be.true;
  });
});
