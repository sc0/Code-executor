import { CommandValidator } from '../domain/validators/command.validator.js';
import { CommandModel } from '../models/command.model.js';
import { Command } from '../domain/command.js';
import mongoose from 'mongoose';
import ExecutorService from '../services/executor.service.js';

export const executeCommand = async (req, res, next) => {
  const validator = new CommandValidator(req.body);

  if (validator.isValid()) {
    const commandData = new Command(req.body);
    const command = new CommandModel(commandData);
    command.startTimestamp = new Date();
    await command.save();

    ExecutorService.execute(command);

    return res.status(200).json(new Command(command));
  }

  return res.status(400).json({description: "Incorrect request body"});
} 


export const getCommand = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({message: 'Incorrect id'});
  }
  const command = await CommandModel.findById(req.params.id);
  if (!command) {
    return res.status(404).json({message: 'No such command found'});
  }
  return res.status(200).json(new Command(command));
}


export const getLastTenEntries = async (req, res, next) => {
  const collection = await CommandModel.find().sort({ startTimestamp: -1 }).limit(10);
  const result = [];

  for (let entry of collection) {
    result.push(new Command(entry));
  }

  return res.status(200).json(result);
}
