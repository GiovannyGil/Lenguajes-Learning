import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-root',
  standalone: true, // This is the default value.
  imports: [CommonModule, RouterOutlet, UserComponent, CommentsComponent], // here we import the CommonModule and RouterOutlet
  templateUrl: './app.component.html', // here we define the template
  styleUrl: './app.component.css' // here we define the styles
})
export class AppComponent {
  title = 'angular-17-app'; // here we define the title
}
