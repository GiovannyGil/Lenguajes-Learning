import { Component } from '@angular/core';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  username = 'Giovanny'; // This is a string value.
  password = '12345678'; // This is a string value.
  isLoggedIn = false; // This is a boolean value, it can be changed to true or false. this is functioned as status 

  // <- inference type in TypeScript (boolean) ACTIVATED

  favGame = ''; // recives the name of the favorite game from GameComponent

  getFavorite(gameName: string) {
    this.favGame = gameName; // recives the name of the favorite game from GameComponent
  }

  // this function returns an alert with the username value.
  greet() {
    alert('Hello, ' + this.username + '!')
  }

}
