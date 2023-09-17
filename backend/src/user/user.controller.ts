import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users') // GET /users
export class UserController {
    constructor(private UserService: UserService) { }

    @Get('me') // GET /users/me
    getMe(
        @GetUser() user: User
    ) {
        return user;
    }

    @Get(':id') // GET /users/:id
    getUserById(
        @Param('id') id: string,
        @GetUser() user: User,
    ) {
        return this.UserService.getUserById(parseInt(id), user.role);
    }

    @Get()
    getAllUsers(
        @GetUser() user: User,
    ) {
        return this.UserService.getAllUsers(user.role);
    }

    @Patch('me')
    updateMe(
        @GetUser() user: User,
        @Body() data: any
    ) {
        return this.UserService.updateMe(user.id, data);
    }

    @Patch(':id')
    updateUser(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body() data: any
    ) {
        return this.UserService.updateUser(parseInt(id), data, user.role);
    }

    @Delete('me')
    deleteMe(
        @GetUser() user: User
    ) {
        return this.UserService.deleteMe(user.id);
    }

}