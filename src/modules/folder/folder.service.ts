import { Injectable } from '@nestjs/common';
import { CreateFolderInput } from './dto/create-folder.dto';
import { Folder } from './schema/folder.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TNameSchema } from 'src/utils/common-schemas';

@Injectable()
export class FolderService {

  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>
  ) {}

  create(createFolderDto: CreateFolderInput) {
    const folder = new this.folderModel(createFolderDto);
    return folder.save();
  }

  findOne(id: string) {
    return this.folderModel.find({ _id: id }).exec();
  }

  updateName(id: string, updateFolderDto: TNameSchema) {
    return this.folderModel.findByIdAndUpdate({_id: id}, updateFolderDto).exec();
  }

  remove(id: string) {
    return this.folderModel.findByIdAndDelete(id).exec();
  }

  findByUser(userId: string) {
    return this.folderModel.find({ userId }).select('-userId').exec();
  }
}
