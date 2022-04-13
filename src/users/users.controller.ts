import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from "./users.service";
import { BuySub, CreateUserAttrs } from "./users.dto"
import { ApiOperation, ApiResponse, ApiTags, ApiBody} from "@nestjs/swagger"
import { users } from "../model/users.model";

@ApiTags('Пользователи')
@Controller()

export class UsersController {
    constructor(private userService: UsersService) {};

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status:201, type:users})
    @ApiResponse({status:500, description: 'Error'})
    @Post('/users')
    createUser(@Body() userAttrs: CreateUserAttrs){
        return this.userService.createUser(userAttrs);
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status:200, type:[users]})
    @ApiResponse({status:500, description: 'Error'})
    @Get('/users')
    getUsers() {
        return this.userService.getUsers()
    }

    @ApiOperation({summary: 'Получить одного пользователя'})
    @ApiResponse({status:200, type:users})
    @ApiResponse({status:500, description: 'Error'})
    @Get('/users/:id')
    getOneUser(@Param('id') id: number) {
        return this.userService.getOneUser(id)
    }

    @ApiOperation({summary: 'Изменить данные о пользователе'})
    @ApiResponse({status:200, description: 'User updated successfully'})
    @ApiResponse({status:500, description: 'Error'})
    @Put('/users/:id')
    updateUser(@Param('id') id: number, @Body() attrs: CreateUserAttrs) {
        return this.userService.updateUser(id, attrs)
    }

    @ApiResponse({status:200, description: 'User deleted successfully'})
    @ApiResponse({status:400, description: 'User not found'})
    @ApiResponse({status:500, description: 'Error'})
    @ApiOperation({summary: 'Удалить пользователя'})
    @Delete('/users/:id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id)
    }

    @ApiResponse({status:200, description: 'Subscription purchased successfully'})
    @ApiResponse({status:400, description: 'The user already has a subscription'})
    @ApiResponse({status:500, description: 'Error'})
    @ApiOperation({summary: 'Покупка абонемента'})
    @Post('/subscription')
    buySub(@Body() id: BuySub) {        
        return this.userService.buySub(id)
    }

}
