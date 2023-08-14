import { IResult } from './iResult';

export interface IDataResult<T> extends IResult {
	data: T;
}
