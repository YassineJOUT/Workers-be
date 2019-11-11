import { Controller,Post,Get,Request, UseGuards } from '@nestjs/common'
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController{
    constructor(
        private readonly authService : AuthService,
        ){}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}