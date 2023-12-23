import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { AchievementService } from 'src/business/concrete/achievement/achievement.service';
import { Achievement } from 'src/entities/concrete/achievement.entity';


@Controller('api/achievements')
export class AchievementsController {
    constructor(private achievementService: AchievementService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.achievementService.getAll();

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.achievementService.getById(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
        let achievement: Achievement = request.body;
        const result = await this.achievementService.update(achievement);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.achievementService.delete(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let achievement: Achievement = request.body;
        const result = await this.achievementService.add(achievement);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}
