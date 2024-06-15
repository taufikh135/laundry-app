import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private keyWord = 'token';

  constructor(
    private storage: Storage,
    private localStorageService: LocalStorageService
  ) {
    this.init();
  }

  private async init() {
    this.storage = await this.storage.create();
  }

  public getToken(): Promise<string> {
    return this.storage.get(this.keyWord) ?? '';
  }

  public setToken(token: string): Promise<void> {
    return this.storage.set(this.keyWord, token);
  }

  public removeToken(): Promise<void> {
    return this.storage.remove(this.keyWord);
  }
}
