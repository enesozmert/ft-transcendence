export class GameScoreDto {
    id:number;
    userHostScore: number;
    userGuestScore: number;
    resultName: string;
    updateTime: Date;
    status: boolean;
}