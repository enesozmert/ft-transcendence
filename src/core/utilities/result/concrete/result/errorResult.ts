import Result from './result';

export class ErrorResult extends Result {
  constructor(message?: string) {
    super(false, message);
  }
}
