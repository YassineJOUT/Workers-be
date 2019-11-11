import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

//import { UserSchema } from './user.model'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
/*MongooseModule.forFeature([{
    name: 'User', schema : UserSchema
}])*/
@Module({
    controllers : [UsersController],
    providers : [UsersService],
    exports : [UsersService]
})

export class UsersModule{}