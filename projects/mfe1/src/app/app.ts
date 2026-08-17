import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '@demo/auth';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  authService = inject(AuthService);
  protected readonly title = computed(() => this.authService.getUser());
}
