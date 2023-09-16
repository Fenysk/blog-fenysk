import * as argon from 'argon2';
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: any) {
        try {
            const { email, username, password } = dto;

            // Hasher le mot de passe
            const hashedPassword = await argon.hash(password);

            // Enregistrer l'utilisateur
            const user = await this.prisma.user.create({
                data: {
                    email,
                    username,
                    hashedPassword: hashedPassword,
                },
            });
            
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    if (error.meta.target[0] === 'email') {
                        throw new ConflictException('Email already exists');
                    } else if (error.meta.target[0] === 'username') {
                        throw new ConflictException('Username already exists');
                    }
                }
            }

            throw new Error(error);
        }
    }

    async login(dto: any) {
        const { email, password } = dto;

        // Trouver l'utilisateur avec l'email
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        // Vérifier si l'utilisateur existe
        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const pwMatches = await argon.verify(
            user.hashedPassword,
            password
        );

        if (!pwMatches) {
            throw new ForbiddenException('Password incorrect');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '5m',
            secret
        })

        return {
            access_token: token
        }
    }

}