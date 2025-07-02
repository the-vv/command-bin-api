import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command } from './schema/command.schema';
import { CreateCommandInput } from './dto/create-command.dto';

@Injectable()
export class CommandService {
  constructor(
    @InjectModel(Command.name) private commandModel: Model<Command>,
  ) {}

  async create(createCommandDto: CreateCommandInput): Promise<Command> {
    const createdCommand = new this.commandModel(createCommandDto);
    return createdCommand.save();
  }

  async findAll(): Promise<Command[]> {
    return this.commandModel.find().exec();
  }

  async findOne(id: string) {
    return this.commandModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.commandModel.findByIdAndDelete(id).exec();
  }

  async updateCommand(id: string, updateCommandDto: Partial<CreateCommandInput>) {
    return this.commandModel.findByIdAndUpdate({ _id: id }, updateCommandDto, { new: true }).exec();
  }

  async findByUser(userId: string) {
    return this.commandModel.find({ userId }).select('-userId').exec();
  }

  async findByCategory(categoryId: string) {
    return this.commandModel.find({ categoryId }).exec();
  }

  async findByFolder(folderId: string) {
    return this.commandModel.find({ folderId }).exec();
  }

  async findRecentCommands(userId: string) {
    return this.commandModel.find({ userId }).sort({ updatedAt: -1 }).limit(10).exec();
  }

}
