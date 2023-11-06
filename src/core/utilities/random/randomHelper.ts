export class RandomHelper {
  static makeText(length: number): string {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  static makeNumbers(length: number): number{
    let text = '';
    const possible = '0123456789';

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return Number(text);
  }
}
