/*
  * @file-description : provides functions that manipulates users
  * @author{Yassine JOUT} yassinejout@gmail.com
*/

// Import the required modules
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { User, UserDTO } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { sendMail } from '../utilities/sendMail';

@Injectable()
export class UsersService {
  private readonly users: UserDTO[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }


  async findUser(email: string): Model<User> {
    const u = await this.userModel.findOne({ email });
    if (u !== null) {
      const user = new UserDTO(u.username, u.email, u.password, u._id);
      return user;
    }
    return null;
  }

  async insertUser(userDto: UserDTO) {
    const u = await this.userModel.findOne({ email: userDto.email });
    if (!u) {
      const user = new this.userModel({ username: userDto.username, email: userDto.email, password: userDto.password });
      const result = await user.save();
      return result._id;
    }

    return "User Alerady exists";

  }

  async changePassword(id: string, new_password: string) {
    const user = await this.userModel.findById(id);
    user.password = new_password;
    user.save();
    return true;
  }

  async passwordForgotten(email: string, confirmCode: string) {
    const u = await this.userModel.findOne({ email: email });
    if (u === null) throw new HttpException({
      status: HttpStatus.NO_CONTENT,
      error: 'This is a custom message',
    }, 204);

    let result = {};
    if (confirmCode !== '') {
      let c = parseInt(confirmCode);
      console.log('confirmation code');
      console.log(c);
      if (u.confirmationCode === c) {
        console.log("Code matches " + confirmCode + " " + u.confirmationCode);
        result = {
          message: "Code matches " + confirmCode + " " + u.confirmationCode,
          match: true
        }
      } else {
        result = {
          message: "Success ur code is " + confirmCode,
          match: false
        }
      }

    } else {
      let confirmationCode = Math.floor(1000 + Math.random() * 9000);
      // persist the confirmation code
      console.log('User Id');
      console.log(u._id);
      await this.userModel.update({ "_id": u._id }, { $set: { "confirmationCode": confirmationCode } });
      // send confirmation email

      sendMail(email, confirmationCode);

      result = {
        message: "An email was send with a confirmation code.",
        

      };
    }


    // return response
    return result;
  }

  async profile(id: string): Model<User> {
    return await this.userModel.findById(id);
  }
}

