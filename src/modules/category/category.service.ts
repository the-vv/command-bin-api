import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { CreateCategoryInput } from './dto/create-category.dto';
import { TNameSchema } from '../../utils/common-schemas';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryInput): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async updateName(id: string, updateCategoryDto: TNameSchema) {
    return this.categoryModel.findByIdAndUpdate({ _id: id }, updateCategoryDto).exec();
  }

  async findByUser(userId: string) {
    return this.categoryModel.find({ userId }).select('-userId').exec();
  }
}
