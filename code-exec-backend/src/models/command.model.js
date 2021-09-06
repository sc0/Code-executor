import mongoose from 'mongoose';
import { CommandResultEntrySchema } from '../models/commandResultEntry.model.js';

const commandSchema = new mongoose.Schema({
  commandQuery: String,
  startTimestamp: Date,
  endTimestamp: Date,
  executionStatus: Number,
  results: [CommandResultEntrySchema]
});

export const CommandModel = mongoose.model('Command', commandSchema);
