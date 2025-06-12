import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { SignupDtoSchema, signupDtoSchema } from '../dto/signupDto';
import { signinDtoSchema, SigninDtoSchema } from '../dto/signinDto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signin')
    @UsePipes(new ZodValidationPipe(signinDtoSchema))
    public async signIn(@Body() body: SigninDtoSchema) {
        return this.authService.signIn(body.email, body.password);
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signupDtoSchema))
    public async signUp(@Body() body: SignupDtoSchema) {
        return await this.authService.signUp(body.name, body.email, body.password);
    }
}
