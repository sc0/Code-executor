import chai from 'chai';
import spies from 'chai-spies';
import { Validator } from '../../../src/domain/validators/base.validator.js';

chai.use(spies);

describe("Base validator class", () => {
  describe("validation method isNotEmptyObject", () => {
    it("validates objects as expected", () => {
      const testedObject = new Validator();

      const resultForEmpty = testedObject.isNotEmptyObject({});
      const resultForString = testedObject.isNotEmptyObject("test string");
      const resultForObject = testedObject.isNotEmptyObject({test: 'object'});

      chai.expect(resultForEmpty).to.be.false;
      chai.expect(resultForString).to.be.false;
      chai.expect(resultForObject).to.be.true;
    });
  });

  describe("performing standard validation flow", () => {
    it("allows to run the methods in order", () => { 
      const testedObject = new Validator();
      const result = [];

      const testValidator = (param) => { result.push(param); return true; };

      testedObject.addValidation(testValidator, 1)
                  .addValidation(testValidator, 2)
                  .addValidation(testValidator, 3)
                  .isValid();

      chai.expect(result).to.be.eql([1,2,3]);
    });

    it("stops validation after first fail", () => {
      const testedObject = new Validator();

      const goodValidator = (param) => true;
      const badValidator = (param) => false;
      const ignoredValidator = (param) => true;

      const goodSpy = chai.spy(goodValidator);
      const badSpy = chai.spy(badValidator);
      const ignoredSpy = chai.spy(ignoredValidator);

      const result = testedObject.addValidation(goodSpy, 1)
                  .addValidation(badSpy, 2)
                  .addValidation(ignoredSpy, 3)
                  .isValid();

      chai.expect(result).to.be.false;
      chai.expect(goodSpy).to.have.been.called.once;
      chai.expect(badSpy).to.have.been.called.once;
      chai.expect(ignoredSpy).to.have.been.called.exactly(0);
    });
  });

});
