import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({isGlobal:true, cache:true}),
    MongooseModule.forRootAsync({
      useFactory:(configService:ConfigService)=>({
        uri:configService.get<string>("MONGODB_URI")
      }),
      inject:[ConfigService]
    }),
    UserModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
