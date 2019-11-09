import { Controller,Get,Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.model';
import { EvalSourceMapDevToolPlugin } from 'webpack';

@Controller('users')
export class UsersController{
    constructor(private readonly usersService : UsersService){}

  

    @Post('auth')
    authenticate(
        @Body('email') userEmail : any,
        @Body('password') userPwd : any
    ) : {user: User,status: string,message: string} {
        return this.usersService.authenticate(userEmail,userPwd);
    }
}