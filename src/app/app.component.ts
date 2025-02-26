import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoaderService } from './Services/loader.service';
import { MatSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent,
    MatSpinner
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-todo';
  loading = false;

    constructor(private loaderService: LoaderService) {
    this.loaderService.loading$.subscribe(state => {
      this.loading = state;
    });
  }
}