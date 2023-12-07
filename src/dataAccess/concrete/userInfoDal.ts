import { Injectable } from "@nestjs/common";
import { UserInfo } from "src/entities/concrete/userInfo.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserInfoDal extends Repository<UserInfo> {
}