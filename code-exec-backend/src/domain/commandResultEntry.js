export class CommandResultEntry {
  constructor(stream, value) {
    this.stream = stream;
    this.value = value;
    this.timestamp = new Date();
  }
}
