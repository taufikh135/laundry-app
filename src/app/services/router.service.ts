import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: ActivatedRoute) {
    //
  }

  public async getParams(key: string): Promise<string> {
    return new Promise((resolve) => {
      this.router.params.subscribe({
        next: (params) => {
          console.log(params);
          resolve(params[key]);
        },

        error: () => {
          resolve('');
        },
      });
    });
  }
}
