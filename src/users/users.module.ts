import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { books } from "../model/books.model";
import { users } from "../model/users.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([users, books])]
})
export class UsersModule {}
