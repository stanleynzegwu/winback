import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService:JwtService,
        private configService: ConfigService,
    ){}

    // async login(loginDto: LoginDto){
        // const existingUser = await this.userModel.findOne({ username: createUserDto.username });
        // if (existingUser) {
        //   throw new HttpException('Username already exists', 400);
        // }
    
        // // Hash the password before saving
        // const hashedPassword = await hash(createUserDto.password, 10);
    
        // // Create the new user with the hashed password
        // const newUser = new this.userModel({
        //   ...createUserDto,
        //   password: hashedPassword,
        // });

        async login(loginDto: LoginDto){
            const user = await this.validateUser(loginDto)

            const payload = {
                email: user.email,
                sub: {
                    name: user.email
                }
            }

            return {
                user,
                backendTokens: {
                    accessToken: await this.jwtService.signAsync(payload,{
                        // expiresIn: '5h',
                        expiresIn: '20s',
                        secret: this.configService.get<string>('JWT_SECRET_KEY'),
                    }),
                    refreshToken: await this.jwtService.signAsync(payload,{
                        expiresIn: '7d',
                        secret: this.configService.get<string>('JWT_REFRESHTOKEN_KEY'),
                    }), 
                }
            }
        }

        async validateUser(dto:LoginDto){
            const user = await this.userService.getUserByEmail(dto.email)
            const isPasswordValid = await compare(dto.password,user.password)

            if(user && isPasswordValid){
                const { password, ...result } = user.toObject()
                return result 
            }

            throw new UnauthorizedException()
        }

        async refreshToken(user:any){
            const payload = {
                email: user.email,
                sub: {
                    name: user.sub
                }
            }

            return {
                accessToken: await this.jwtService.signAsync(payload,{
                    // expiresIn: '5h',
                    expiresIn: '1h',
                    secret: this.configService.get<string>('JWT_SECRET_KEY'),
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '7d',
                    secret: this.configService.get<string>('JWT_REFRESHTOKEN_KEY'),
                }), 
            }
        }
}
