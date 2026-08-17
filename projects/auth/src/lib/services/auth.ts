import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = signal('Abhishek');

  updateUser(nuser: string) {
    this.user.set(nuser);
  }

  getUser() {
    return this.user();
  }
}
