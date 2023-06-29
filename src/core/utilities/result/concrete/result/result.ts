import { IResult } from '../../abstract/iResult';

export default class Result implements IResult {
  public success: boolean;
  public message?: string;

  constructor(success: boolean, message?: string) {
    this.success = success;
    this.message = message;
  }
}
