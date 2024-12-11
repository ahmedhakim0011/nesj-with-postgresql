import {ParseIntPipe, ValidationPipe, Controller, Body, Get, Param, Post, Patch, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get() // Get / users 
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    @Get(":id") // Get / users /:id
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch(":id")
    update(@Param("id", ParseIntPipe,) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(":id")
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)

    }
}
