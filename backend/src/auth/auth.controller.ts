import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/resfresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService, private authService: AuthService){}

    @Post('register')
    async registerUser(@Body() createUserDto:CreateUserDto){
        return await this.userService.createUser(createUserDto)
    }

    @Post('login')
    async login(@Body() dto:LoginDto){
        return await this.authService.login(dto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)
    }
}
