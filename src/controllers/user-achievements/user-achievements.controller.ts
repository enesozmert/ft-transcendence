import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { UserAchievement } from 'src/entities/concrete/userAchievement.entity';
import { UserAchievementService } from 'src/business/concrete/user-achievement/user-achievement.service';

@Controller('api/user-achievements')
export class UserAchievementsController {
    constructor(private userAchievementService: UserAchievementService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.userAchievementService.getAll();

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.userAchievementService.getById(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
        let userAchievement: UserAchievement = request.body;
        const result = await this.userAchievementService.update(userAchievement);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.userAchievementService.delete(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let userAchievement: UserAchievement = request.body;
        const result = await this.userAchievementService.add(userAchievement);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getalluserachievementbyachievementdtowithuserid')
    async getAllUserAchievementByAchievementDtoWithUserId(@Res() response: Response, @Req() request: Request) {
        let userId: number = Number(request.query.userId);
        const result = await this.userAchievementService.getAllUserAchievementByAchievementDtoWithUserId(userId);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}
