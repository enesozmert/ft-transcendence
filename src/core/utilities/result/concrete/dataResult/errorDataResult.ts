import { DataResult } from './dataResult';

export class ErrorDataResult<T> extends DataResult<T> {
	constructor(data?: T, message?: string) {
		super(data, false, message);
	}
}
