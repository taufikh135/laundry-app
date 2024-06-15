import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashDataService {
  private flashData: any;

  constructor() {}

  public setFlashData(key: string, value: any): void {
    this.flashData[key] = value;
  }

  public getFlashData(key: string): any {
    try {
      return this.flashData[key];
    } finally {
      delete this.flashData[key];
    }
  }
}
