export class Command {
  constructor(entity) {
    if (entity._id) {
      this._id = entity._id;
    }
    this.commandQuery = entity.commandQuery;
    this.startTimestamp = null;
    this.endTimestamp = null;
    this.executionStatus = entity.executionStatus;
    this.results = entity.results;
  }
}
