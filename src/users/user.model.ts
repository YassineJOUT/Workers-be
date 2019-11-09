import * as mongoose from 'mongoose';

/*export const UserSchema = new mongoose.Schema({
     username: {type: String, required: true},
     email: {type: String, required: true},
     password: {type: String, required: true}
});*/

export class User{
    constructor(
    public id: string,
    public username: string, 
    public email: string,
    public password: string)
    {}
}
