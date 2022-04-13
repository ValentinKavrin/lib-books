import { Body, Controller, Post } from '@nestjs/common';
import { TakeBook, CreateBookAttrs } from './books.dto';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody} from "@nestjs/swagger"
import { books } from 'src/model/books.model';

@ApiTags('Книги')
@Controller('books')
export class BooksController {

    constructor( private booksService: BooksService) {}

    @ApiOperation({summary: 'Создание книги'})
    @ApiResponse({status:201, type:books})
    @Post()
    createBook(@Body() attrs: CreateBookAttrs) {
        return this.booksService.createBook(attrs)
    }

    @ApiOperation({summary: 'Добавление книги пользователю'})
    @ApiResponse({status:200, description: 'Have a good reading'})
    @ApiResponse({status:400, description: 'Something went wrong'})
    @ApiResponse({status:500, description: 'Error'})
    @Post('/addBook')
    addBook(@Body() attrs: TakeBook) {
        return this.booksService.addUser(attrs)
    }

    @ApiOperation({summary: 'Удаление книги у пользователя'})
    @ApiResponse({status:200, description: 'Success return book'})
    @ApiResponse({status:400, description: 'User does not have books'})
    @ApiResponse({status:500, description: 'Error'})
    @Post('/returnBook')
    returnBook(@Body() attrs: TakeBook) {
        return this.booksService.returnBook(attrs)
    }
}
