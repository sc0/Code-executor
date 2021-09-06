import mongoose from 'mongoose';

export const CommandResultEntrySchema = new mongoose.Schema({
  stream: Number,
  value: String,
  timestamp: Date
});

export const CommandResultEntryModel = 
  mongoose.model('CommandResultEntry', CommandResultEntrySchema);
