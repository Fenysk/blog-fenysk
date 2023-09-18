import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ArticleModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    MediaModule
  ],
})
export class AppModule { }