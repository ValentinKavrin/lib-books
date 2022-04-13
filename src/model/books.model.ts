import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { users } from './users.model';
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class books {
  @ApiProperty({example: '1', description: 'Идентификатор книги'})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({example: 'Harry Potter', description: 'Название книги'})
  @Column()
  title: string;

  @ManyToOne( () => users, users => users.books )
  user_id: users;
}