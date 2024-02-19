import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBioComponent } from './admin-bio/admin-bio.component';
import { StandardBioComponent } from './standard-bio/standard-bio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h1>{{ title }}</h1>
  
  <hr>
  <ng-container *ngFor="let a_comp of components">
      <ng-container *ngComponentOutlet="a_comp"></ng-container>
    </ng-container>
  <hr>

  <button (click)="toggleComponent()">Toggle Component</button>
  <ng-container *ngComponentOutlet="flip_comp"></ng-container> 
  <hr>

  <small>__END__</small>
  `,
})
export class AppComponent {
  title = 'dyn-comp-app';

  components: Type<any>[] = [AdminBioComponent, StandardBioComponent];

  isAdmin = false;
  flip_comp = StandardBioComponent;

  toggleComponent() {
    this.isAdmin = !this.isAdmin;
    this.flip_comp = this.isAdmin ? AdminBioComponent : StandardBioComponent;
  }
}
