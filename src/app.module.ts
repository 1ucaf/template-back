import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.DATABASE_URL,
      entities: [UserEntity, BookEntity],
      database: process.env.DATABASE_NAME,
      synchronize: true,
    }),
    AuthModule,
    BooksModule,
    UsersModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
