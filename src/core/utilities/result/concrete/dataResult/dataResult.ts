import { IDataResult } from '../../abstract/iDataResult';
import Result from '../result/result';

export class DataResult<T> extends Result implements IDataResult<T> {
  public data: T;

  constructor(data: T, success: boolean, message?: string) {
    super(success, message);
    this.data = data;
  }
}
