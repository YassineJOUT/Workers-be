import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
     username: {type: String, required: true},
     email: {type: String, required: true},
     password: {type: String, required: true}
});

export interface User{
    _id: string;
    username: string;
    email: string;
    password: string;
}

export class UserDTO{
    constructor(
    public username: string, 
    public email: string,
    public password: string,
    public id?: string)
    {}
}