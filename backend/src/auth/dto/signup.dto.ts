import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @MaxLength(20)
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(3)
    readonly password: string;
}