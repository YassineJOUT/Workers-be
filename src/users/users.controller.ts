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
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
      return this.userService.profile(req.body.id);
    }

    
    @Post('add')
    addUser(@Request() req){
        const user = new UserDTO(req.body.username,req.body.email,req.body.password);
        return this.userService.insertUser(user);
    }
}