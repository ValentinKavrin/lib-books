import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from "../model/users.model";
import { BuySub, CreateUserAttrs } from "./users.dto"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(users)
        private usersRepository: Repository<users>,
      ) {}

    async createUser(attrs: CreateUserAttrs)/*: Promise<users>*/{
        const user = await this.usersRepository.create(attrs);
        await this.usersRepository.save(user);
        return user
    }

    async getUsers()/*: Promise<users[]>*/ {
        const users = await this.usersRepository.find()
        return users
    }

    async getOneUser(id: number)/*: Promise<users>*/{
        const user = await this.usersRepository.findOne(id)
        return user
    }

    async updateUser(id: number, attrs: CreateUserAttrs) {
        const user = await this.usersRepository.update(id, attrs)
        if (user) {
            throw new HttpException('User updated successfully', 200)
        } else {
            throw new HttpException('Error', 500)
        }
    }

    async deleteUser(id: number) {
        const checkUser = await this.usersRepository.findOne(id)
        if (!checkUser) {
            throw new HttpException('User not found', 400)
        }
        const deleteUser = await this.usersRepository.delete(id)
        if (deleteUser) {
            throw new HttpException('User deleted successfully', 200)
        }else {
            throw new HttpException('Error', 500)
        }
    }

    async buySub(id: BuySub) {
        if ((await this.usersRepository.findOne(id)).subscription == true) {
            throw new HttpException('The user already has a subscription', 400)
        }
        const updateSub = await this.usersRepository.createQueryBuilder()
        .update(users)
        .set({
            subscription: true
        })
        .where("id=:id", {id:id.id})
        .execute()
        if (updateSub) {
            throw new HttpException('Subscription purchased successfully', 200)
        } else {
            throw new HttpException('Error', 500)
        }
    }
}
