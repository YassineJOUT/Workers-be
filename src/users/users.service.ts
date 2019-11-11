/*
  * @file-description : provides functions that manipulates users
  * @author{Yassine JOUT} yassinejout@gmail.com
*/

// Import the required modules
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
    const u = await this.userModel.findOne({email: userDto.email});
    if(!u){
      const user = new this.userModel({username :userDto.username,email:userDto.email,password:userDto.password});
      const result = await user.save();
      return result._id;
    }
   
    return "User Alerady exists";
    
  }

  async changePassword(id: string,new_password: string){
    const user = await this.userModel.findById(id);
    user.password = new_password;
    user.save();
    return true;
  }

  async passwordForgotten(email: string){

    return ;
  }

  async profile(id: string): Model<User>{
    return await this.userModel.findById(id);
  }
}

