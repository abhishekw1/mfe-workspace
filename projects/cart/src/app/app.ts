import { Component, inject } from '@angular/core';
import { SharedService } from '@demo/shared';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sharedService = inject(SharedService);
  protected readonly cart = this.sharedService.cart;
  protected readonly cartTotal = this.sharedService.cartTotal;
}
