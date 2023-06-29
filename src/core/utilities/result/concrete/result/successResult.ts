import Result from './result';

export class SuccessResult extends Result {
  constructor(message?: string) {
    super(true, message);
  }
}
