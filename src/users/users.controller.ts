import { Controller,Post,Request, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController{
    constructor(private readonly usersService : UsersService){}

  
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return req.user;
        //{userEmail,userPwd}//this.usersService.findUser(userEmail);
    }
}