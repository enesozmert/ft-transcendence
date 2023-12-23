import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { AchievementRuleService } from 'src/business/concrete/achievement-rule/achievement-rule.service';
import { AchievementRule } from 'src/entities/concrete/achievementRule.entity';

@Controller('api/achievement-rules')
export class AchievementRulesController {
    constructor(private achievementRuleService: AchievementRuleService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.achievementRuleService.getAll();

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.achievementRuleService.getById(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
        let achievementRule: AchievementRule = request.body;
        const result = await this.achievementRuleService.update(achievementRule);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.achievementRuleService.delete(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let achievementRule: AchievementRule = request.body;
        const result = await this.achievementRuleService.add(achievementRule);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/checkachievement')
    async checkAchievement(@Res() response: Response, @Req() request: Request) {
        let userId: number = Number(request.query.userId);
        let achName: string = String(request.query.achName);
        const result = await this.achievementRuleService.checkAchievement(userId, achName);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}
