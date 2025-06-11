import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { SignupDtoSchema, signupDtoSchema } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signin')
    public async signIn(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return this.authService.signIn(email, password);
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signupDtoSchema))
    public async signUp(@Body() body: SignupDtoSchema) {
        return await this.authService.signUp(body.name, body.email, body.password);
    }
}
