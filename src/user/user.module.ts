import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      })
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
  ],
  controllers: [
    UserController,
    AuthController
  ],
  providers: [UserService, AuthService],
})
export class UserModule {}
