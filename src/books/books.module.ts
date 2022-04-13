import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { books } from "../model/books.model";
import { users } from "../model/users.model";
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    controllers: [BooksController],
    providers: [BooksService],
    imports: [TypeOrmModule.forFeature([users, books])]
})
export class BooksModule {}
    
