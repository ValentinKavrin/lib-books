import { ApiProperty } from "@nestjs/swagger"
export class CreateBookAttrs {
    @ApiProperty({example: 'Harry Potter', description: 'Название книги'})
    readonly title: string;
}

export class TakeBook {
    @ApiProperty({example: 'Harry Potter', description: 'Название книги'})
    readonly title: string
    @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
    readonly user_id: number
}