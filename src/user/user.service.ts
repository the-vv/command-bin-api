import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupDtoSchema } from './dto/signupDto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: SignupDtoSchema) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  // }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string, requirePassword = false): Promise<userDocument | null> {
    return this.userModel.findOne({ email }).select(requirePassword ? '+password' : '-password').exec();
  }
}
