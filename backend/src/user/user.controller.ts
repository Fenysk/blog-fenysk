import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
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
        @GetUser('role') role: string
    ) {
        return this.UserService.getUserById(parseInt(id), role);
    }

    @Get()
    getAllUsers(
        @GetUser('role') role: string
    ) {
        return this.UserService.getAllUsers(role);
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
        @GetUser('role') role: string,
        @Param('id') id: string,
        @Body() data: any
    ) {
        return this.UserService.updateUser(parseInt(id), data, role);
    }

}