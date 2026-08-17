import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, inject, signal, viewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `<h1 class="text-3xl font-bold">
      {{ title() }}
    </h1>
    <ng-container #products></ng-container> `,
})
export class Home {
  protected readonly title = signal('Trending Products');
  cartRef = viewChild<HTMLTemplateElement>('products');
  viewRef = inject(ViewContainerRef);

  async loadcart() {
    const { App } = await loadRemoteModule('products', './Component');
    this.viewRef.clear();
    this.viewRef.createComponent(App);
  }

  ngAfterViewInit(): void {
    this.loadcart();
  }
}
