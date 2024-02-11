import { Injectable } from "@nestjs/common";
import { UserBlock } from "src/entities/concrete/userBlock.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserBlockDal extends Repository<UserBlock> {
}
