import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { UserOperationClaimService } from 'src/business/concrete/user-operation-claim/user-operation-claim.service';
import { Request, Response } from 'express';
import { UserOperationClaim } from 'src/core/entities/concrete/userOperationClaim.entity';
@Controller('user-operation-claims')
export class UserOperationClaimsController {
    constructor(private userOperationClaimService: UserOperationClaimService) { }

    @Get('/getall')
    async getAll(@Res() response: Response, @Req() request: Request) {
        const result = await this.userOperationClaimService.getAll();

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/getbyid')
    async getById(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.query);
        const result = await this.userOperationClaimService.getById(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/update')
    async update(@Res() response: Response, @Req() request: Request) {
        let userOperationClaim: UserOperationClaim = request.body;
        const result = await this.userOperationClaimService.update(userOperationClaim);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Get('/delete')
    async delete(@Res() response: Response, @Req() request: Request) {
        let id: number = Number(request.params);
        const result = await this.userOperationClaimService.delete(id);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }

    @Post('/add')
    async add(@Res() response: Response, @Req() request: Request) {
        let userOperationClaim: UserOperationClaim = request.body;
        const result = await this.userOperationClaimService.add(userOperationClaim);

        if (result.success) {
            return response.status(HttpStatus.OK).send(await result);
        }
        return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
}
