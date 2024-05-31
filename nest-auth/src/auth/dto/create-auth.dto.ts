import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAuthDto {

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    confirmPassword:string
    

    @IsOptional()
    @IsString()
    profileImg?:string
}
