import {  Injectable } from '@nestjs/common'
import { User, UserDTO } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class UsersService{
  private readonly users : UserDTO[];

  constructor(@InjectModel('User') private readonly userModel: Model<User> ) { }
  

  async findUser(email: string): Model<User> {
      const u = await this.userModel.findOne({email});
      const user = new UserDTO(u.username,u.email,u.password,u._id);
      return user;
  }

  async insertUser (userDto : UserDTO){
    const user = new this.userModel({username :userDto.username,email:userDto.email,password:userDto.password});
    const result = await user.save();
    return result._id;
    
  }

    
  async profile(id: string): Model<User>{
    return await this.userModel.findById(id);
  }
}

