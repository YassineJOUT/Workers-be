import {  Injectable } from '@nestjs/common'
import { User } from './user.model';


@Injectable()
export class UsersService{
    authenticate(email: string, password: string):{user: User,status: string,message: string} {
        
        if(email === 'yassinejout@gmail.com' && password === 'yassine'){
            const authUser = new User(new Date().toString(),'yassine',email,password);
            return {
                user: authUser,
                status : 'SUCCESS',
                message : 'Authentication succeded'
            }
        } else 
            return {
                user: undefined,
                status : 'ERROR',
                message : 'Authentication unsucceded'
            };
    }
}

