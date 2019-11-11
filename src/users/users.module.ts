import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserSchema } from './user.model'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[AuthModule,MongooseModule.forFeature([{
        name: 'User', schema : UserSchema
    }])],
    controllers : [UsersController],
    providers : [UsersService],
    exports : [UsersService]
})

export class UsersModule{}