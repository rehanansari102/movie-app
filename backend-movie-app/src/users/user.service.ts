import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserDto } from '../dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: UserDto): Promise<User> {
    try {
      const userExists = await this.userModel.findOne({ email: createUserDto.email });
      if (userExists) {
        throw new Error('User already exists with this email');
      }

      if (!createUserDto.password) {
        throw new Error('Password is required');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      createUserDto.password = hashedPassword;
      return  this.userModel.create(createUserDto);
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
  
  async validateUser(payload: any) {

    const user = await this.userModel.findOne({ email: payload.email, _id: payload.id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
