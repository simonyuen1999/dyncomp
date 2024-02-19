import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBioComponent } from './admin-bio/admin-bio.component';
import { StandardBioComponent } from './standard-bio/standard-bio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
   <ng-container *ngComponentOutlet="component"></ng-container>
   <button (click)="toggleComponent()">Toggle Component</button>
  `,
})
export class AppComponent {
  title = 'dyn-comp-app';

  isAdmin = false;
  component = StandardBioComponent;

  toggleComponent() {
    this.isAdmin = !this.isAdmin;
    this.component = this.isAdmin ? AdminBioComponent : StandardBioComponent;
  }
}
