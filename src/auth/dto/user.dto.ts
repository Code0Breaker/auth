import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    fullname:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
    
    @IsNotEmpty()
    country:number;
}