import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString,  } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;

    @IsEnum(['admin', 'editor', 'volunteer', 'member'], {
      message: 'Role must be one of: admin, editor, volunteer, member',
    })
    @IsOptional()
    role?: 'admin' | 'editor' | 'volunteer' | 'member';
}