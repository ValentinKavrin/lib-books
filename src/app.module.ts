import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'dashadom74',
    database: 'lib-books',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true
  }),
    UsersModule,
    BooksModule,]
})
export class AppModule {}
