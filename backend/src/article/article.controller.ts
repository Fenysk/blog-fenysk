import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('article') // POST /article
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @Get()
    getArticles() {
        console.log('GET /article');
        return this.articleService.getArticles();
    }

    @Get('all')
    getAllArticles() {
        console.log('GET /article/all');
        return this.articleService.getAllArticles();
    }

    @Get('latest')
    getLatestArticles() {
        console.log('GET /article/latest');
        return this.articleService.getLatestArticles();
    }

    @Get(':id')
    getArticleById(@Param('id') id: string) {
        console.log(`GET /article/${id}`);
        return this.articleService.getArticleById(parseInt(id));
    }

    @UseGuards(JwtGuard)
    @Post('create')
    createArticle(@Body() data: ArticleDto, @GetUser('id') userId: number) {
        console.log('POST /article');
        return this.articleService.createArticle(data, userId);
    }

    @UseGuards(JwtGuard)
    @Post('create/test')
    createTestArticle(@GetUser('id') userId: number) {
        console.log('POST /article');
        return this.articleService.createTestArticle(userId);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updateArticle(@Param('id') id: string, @Body() data: ArticleDto) {
        console.log(`PUT /article/${id}`);
        return this.articleService.updateArticle(parseInt(id), data);
    }

    @UseGuards(JwtGuard)
    @Patch(':id/published')
    updateArticlePublished(@Param('id') id: string, @Query('published') published: string) {
        console.log(`PATCH /article/${id}/published`);
        return this.articleService.updateArticlePublished(parseInt(id), published);
    }

    @UseGuards(JwtGuard)    
    @Delete(':id')
    deleteArticle(@Param('id') id: string) {
        console.log(`DELETE /article/${id}`);
        return this.articleService.deleteArticle(parseInt(id));
    }

}