import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "role": 'INTERN',
            "email": "Sincere@april.biz"

        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "role": 'ENGINEER',
            "email": "Shanna@melissa.tv",

        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "role": 'ADMIN',
            "email": "Nathan@yesenia.net",

        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "role": 'ENGINEER',
            "email": "Julianne.OConner@kory.org",

        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "role": 'ADMIN',
            "email": "Lucio_Hettinger@annie.ca",

        },
    ]

    findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
        if (role) {
            const rolesArry = this.users.filter(user => user.role === role)
            if (rolesArry.length === 0) throw new NotFoundException("user role not found")
            return rolesArry
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) {
            throw new NotFoundException("User not found")
        }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }

            return user
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id === id);

        return removedUser
    }
}

