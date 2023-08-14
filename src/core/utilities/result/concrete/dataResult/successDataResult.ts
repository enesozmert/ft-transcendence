import { DataResult } from './dataResult';

export class SuccessDataResult<T> extends DataResult<T> {
	constructor(data: T, message?: string) {
		super(data, true, message);
	}
}
