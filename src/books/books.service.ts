import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { books } from 'src/model/books.model';
import { users } from 'src/model/users.model';
import { Repository } from 'typeorm';
import { CreateBookAttrs, TakeBook } from './books.dto';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(books)
        private booksRepository: Repository<books>,
        @InjectRepository(users)
        private usersRepository: Repository<users>,
    ) {}

    async createBook(attrs: CreateBookAttrs) {
        const checkBook = await this.booksRepository.find(attrs)        
        if (checkBook.length !== 0) {
            throw new HttpException('Book already added', 400)
        }
        const book = await this.booksRepository.create(attrs)
        await this.booksRepository.save(book);
        return book
    }

    async addUser(attrs: TakeBook) {
        const checkBook = await this.booksRepository.findOne({
            title:attrs.title,
        })
        if (checkBook === undefined) {
            throw new HttpException('Book not found', 400)
        }
        const checkUse = await this.booksRepository.createQueryBuilder("user")
        .groupBy("user.id")
        .where("title=:title", {title:attrs.title})
        .execute()        
        if (checkUse[0].user_userIdId === null) {
            const user = await this.usersRepository.findOne(attrs.user_id)
            if (user.subscription === false) {
                throw new HttpException('User needs buy sub', 400)
            } else {
                if (user.books.length >= 5) {
                    throw new HttpException('User already have a lot of books', 400)
                } else {
                    const newBook = await this.booksRepository.createQueryBuilder()
                    .update(books)
                    .set({
                        user_id:user
                    })
                    .where("title=:title", {title:attrs.title})
                    .execute()
                    if (newBook) {
                        throw new HttpException('Have a good reading', 200)
                    } else {
                        throw new HttpException('Errors', 500)
                    }
                }
            }
        } else {
            throw new HttpException('Book already used', 400)
        } 
    }

    async returnBook(attrs: TakeBook) {
        const user = await this.usersRepository.findOne(attrs.user_id)
        if (user.books.length === 0) {
            throw new HttpException('User does not have books', 400)
        }
        const returnBook = await this.booksRepository.createQueryBuilder()
        .update(books)
        .set({user_id:null})
        .where("title=:title", {title:attrs.title})
        .execute()
        if (returnBook.affected === 1) {
            throw new HttpException('Success return book', 200)
        } else {
            throw new HttpException('Error', 500)
        }
    }
}
