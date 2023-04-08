import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interface";

// DTO para realizar la validación en lo pasado por el 'body'
export class AuthDTO implements AuthBody {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string
}