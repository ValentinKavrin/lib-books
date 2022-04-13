import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { books } from './books.model';
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class users  {

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({example: 'Valentin', description: 'Имя пользователя'})
  @Column()
  name: string;

  @ApiProperty({example: 'false', description: 'Подписка'})
  @Column({default: false})
  subscription: boolean;

  @OneToMany(() => books, books => books.user_id, { eager: true, cascade: true } )
  @JoinColumn() books: books[];
    
}