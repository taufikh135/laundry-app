import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public setItemJson(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public getItemJson(key: string): object | null {
    const value = this.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }
}
