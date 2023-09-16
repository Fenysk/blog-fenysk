import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) { }

    async getArticles() {
        const articles = await this.prisma.article.findMany({
            where: { published: true, },
        });

        if (articles.length === 0) {
            console.log('No articles found :/');
            throw new NotFoundException('No articles found :/');
        }

        console.log('Articles found !');
        return articles;
    }

    async getAllArticles() {
        const articles = await this.prisma.article.findMany();

        if (articles.length === 0) {
            console.log('No articles found :/');
            throw new NotFoundException('No articles found :/');
        }

        console.log('Articles found !');
        return articles;
    }

    async getLatestArticles() {
        const articles = await this.prisma.article.findMany({
            take: 3,
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                published: true,
            },
        });

        if (articles.length === 0) {
            console.log('No articles found :/');
            throw new NotFoundException('No articles found :/');
        }

        console.log('Articles found !');
        return articles;
    }

    async getArticleById(id: number) {

        const article = await this.prisma.article.findUnique({
            where: {
                id,
                published: true,
            },
        });

        if (!article) {
            console.log(`Article with id ${id} not found :/`);
            throw new NotFoundException(`Article with ID ${id} not found :/`);
        }

        console.log(`Article with id ${id} found !`);
        return article;
    }

    async createArticle(data: ArticleDto, authorId: number) {
        try {
            const article = await this.prisma.article.create({
                data: {
                    ...data,
                    authorId,
                },
            });

            console.log('Article created !');
            return article;
        } catch (error) {
            throw new Error('Unable to create article :/');
        }
    }

    async createTestArticle(authorId: number) {
        try {
            const article = await this.prisma.article.create({
                data: {
                    authorId,
                    title: 'Test article',
                    content: 'This is just a test article !',
                    published: true,
                },
            });

            console.log('Article created !');
            return article;
        } catch (error) {
            throw new Error('Unable to create article :/');
        }
    }

    async updateArticle(id: number, data: ArticleDto) {
        try {
            const article = await this.prisma.article.update({
                where: { id },
                data,
            })

            console.log(`Article with id ${id} updated !`);
            return article;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    console.log(`Article with id ${id} not found :/`);
                    throw new NotFoundException(`Article with id ${id} not found :/`);
                }
            }

            throw new Error(error);
        }
    }

    async updateArticlePublished(id: number, published: string) {
        try {
            const publishedBool = published === 'true' ? true : false;

            const article = await this.prisma.article.update({
                where: { id },
                data: { published: publishedBool },
            });

            console.log(`Article with id ${id} updated with published = ${publishedBool} !`);
            return article;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    console.log(`Article with id ${id} not found :/`);
                    throw new NotFoundException(`Article with id ${id} not found :/`);
                }
            }

            throw new Error(error);
        }
    }

    async deleteArticle(id: number) {

        try {
            await this.prisma.article.delete({
                where: { id },
            });

            console.log(`Article with id ${id} deleted !`);
            return { message: `Article with id ${id} deleted !` };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    console.log(`Article with id ${id} not found :/`);
                    throw new NotFoundException(`Article with id ${id} not found :/`);
                }
            }

            throw new Error(error);
        }
    }

}