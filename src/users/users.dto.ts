import { ApiProperty } from "@nestjs/swagger"
export class CreateUserAttrs {
    @ApiProperty({example: 'Valentin', description: 'Имя пользователя'})
    readonly name: string;
}
export class BuySub {
    @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
    readonly id: number;
}

