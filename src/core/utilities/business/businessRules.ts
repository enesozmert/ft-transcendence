import { IResult } from '../result/abstract/IResult';

export class BusinessRules {
  public static run(...logics: IResult[]): IResult | null {
    for (const logic of logics) {
      if (!logic.success) {
        return logic;
      }
    }
    return null;
  }
}
