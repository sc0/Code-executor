import { Validator } from './base.validator.js';

export class CommandValidator extends Validator {

  constructor(body) {
    super();

    this.addValidation(this.isNotEmptyObject, body)
         .addValidation(this.containsCommandQuery, body);
  }

  containsCommandQuery(body) { 
    return body.commandQuery && body.commandQuery.length > 0;
  }

}
