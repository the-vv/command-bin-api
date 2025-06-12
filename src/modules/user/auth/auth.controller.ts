import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { SignupDto, signupDto } from '../dto/signupDto';
import { signinDto, SigninDto } from '../dto/signinDto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signin')
    @UsePipes(new ZodValidationPipe(signinDto))
    public async signIn(@Body() body: SigninDto) {
        return this.authService.signIn(body.email, body.password);
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signupDto))
    public async signUp(@Body() body: SignupDto) {
        return await this.authService.signUp(body.name, body.email, body.password);
    }
}
