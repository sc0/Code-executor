export class Validator {
  validationsToPerform = [];

  isValid() { 
    for (let validationFn of this.validationsToPerform) { 
      if (!validationFn()) { 
        return false;
      }
    }

    return true;
  }

  addValidation(validationFn, object) {
    this.validationsToPerform.push(() => validationFn(object));
    return this;
  }

  isNotEmptyObject(body) { 
    return body.constructor === Object && Object.keys(body).length > 0;
  }
}
