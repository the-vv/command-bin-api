import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FolderModule } from './modules/folder/folder.module';
import { JwtDecodeMiddleware } from './middlewares/jwt-decode.middleware';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname,req,res,responseTime',
            messageFormat: '{req.method} {req.url} - {res.statusCode} - {responseTime}ms',
          },
        },
      },
      exclude: ['health', 'status'], // Exclude health and status routes from logging
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    FolderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtDecodeMiddleware)
      .forRoutes('*'); // Applies middleware to all routes
  }
}
