/*
  * @file-description : UsersController handles incoming requests for the endpoint users and sends responses
  * @author{Yassine JOUT} yassinejout@gmail.com
*/

// Import the required modules
import { Controller,Post,Get,Request, UseGuards } from '@nestjs/common'
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDTO } from './user.model';

@Controller('users')
export class UsersController{
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
        ){}
    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async login(@Request() req){
        
        return { status: 'success', data :this.authService.login(req.user)};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
      return this.userService.profile(req.body.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('changePassword')
    changePwd(@Request() req) {
      return this.userService.changePassword(req.body.id,req.body.newPWD);
    }

    
    @Post('passwordForgotten')
    passwordForgotten(@Request() req) {
      return this.userService.passwordForgotten(req.body.email);
    }

    
    @Post('signup')
    addUser(@Request() req){
        const user = new UserDTO(req.body.username,req.body.email,req.body.password);
        return this.userService.insertUser(user);
    }
}