import {  Injectable } from '@nestjs/common'
import { User } from './user.model';


@Injectable()
export class UsersService{
    private readonly users : User[];

    async findUser(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
    constructor() {
        this.users = [
          {
            id: '1',
            username: 'yassine',
            password: 'yassine',
            email: 'yassinejout@gmail.com'
          },
          {
            id: '1',
            username: 'chris',
            password: 'secret',
            email: 'yas3sinejout@gmail.com'
          },
          {
            id: '1',
            username: 'maria',
            password: 'guess',
            email: 'yassin4ejout@gmail.com'
          },
        ];
      }
    
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

