import { Component, inject } from '@angular/core';
import { Product, SharedService } from '@demo/shared';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sharedService = inject(SharedService);
  protected readonly productsResponse = this.sharedService.productData;

  addToCart(product: Product) {
    this.sharedService.addToCart(product);
  }
}
