import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUserById(id: number, role: string) {

        if ((role !== 'ADMIN') && (role !== 'REDACTOR')) {
            throw new UnauthorizedException(`You are not authorized to perform this action`);
        }

        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        delete user.hashedPassword;

        return user;
    }

    async getAllUsers(role: string) {

        if ((role !== 'ADMIN') && (role !== 'REDACTOR')) {
            throw new UnauthorizedException(`You are not authorized to perform this action`);
        }

        const users = await this.prisma.user.findMany();

        if (!users) {
            throw new NotFoundException(`No users found`);
        }

        return users.map((user) => {
            delete user.hashedPassword;
            return user;
        });
    }

    async updateMe(id: number, data: any) {

        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
        });

        delete updatedUser.hashedPassword;

        return updatedUser;
    }

    async updateUser(id: number, data: any, role: string) {

        if ((role !== 'ADMIN') && (role !== 'REDACTOR')) {
            throw new UnauthorizedException(`You are not authorized to perform this action`);
        }

        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
        });

        delete updatedUser.hashedPassword;

        return updatedUser;
    }

    async deleteMe(id: number) {

        const deletedUser = await this.prisma.user.delete({
            where: { id },
        });

        if (!deletedUser) {
            throw new NotFoundException(`No user found with id: ${id}`);
        }

        const message = `User with id: ${id} has been deleted`;

        return message;
    }

}
