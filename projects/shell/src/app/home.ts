import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, inject, signal, viewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@demo/auth';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `<h1 class="text-3xl font-bold">
      {{ title() }}
    </h1>
    <div class="flex gap-2 my-2">
      <input
        [(ngModel)]="name"
        type="text"
        placeholder="Enter name to update"
        class="border-1 rounded-sm p-2"
      />
      <button class="bg-sky-500 hover:bg-sky-700 px-4 text-white rounded-xs" (click)="onUpdate()">Update</button>
    </div> `,
  styles: ``,
})
export class Home {
  protected readonly title = signal('Update user deatils:');
  mfe2Ref = viewChild<HTMLTemplateElement>('mfe2');
  viewRef = inject(ViewContainerRef);
  authService = inject(AuthService);

  name = this.authService.getUser();

  async loadMfe2() {
    const { App } = await loadRemoteModule('mfe2', './Component');
    this.viewRef.clear();
    this.viewRef.createComponent(App);
  }

  ngAfterViewInit(): void {
    this.loadMfe2();
  }

  onUpdate() {
    this.authService.updateUser(this.name)
  }
}
