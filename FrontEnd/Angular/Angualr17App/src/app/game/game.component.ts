import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  template: `
  <h3>GAMES</h3>
  <h3>the games of {{ username }}</h3>
    <ul>
      @for (game of games; track game.id) {
        <li (click)="fav(game.name)">{{ game.name }}</li>
      }
    </ul>
  `,
  styles: ``
})
export class GameComponent {
  @Input() username = ''; // recives the name from UserComponenet
  @Output() addFavoriteEvent = new EventEmitter<string>(); // send the name of the favorite game to UserComponent

  // function for send the name of the favorite game
  fav(gameName: string) {
    this.addFavoriteEvent.emit(gameName); // send the name of the favorite game to UserComponent with the emit function
  }

  games = [
    {
      id: 1,
      name: 'Super Mario Bros',
    },
    {
      id: 2,
      name: 'The Legend of Zelda',
    },
    {
      id: 3,
      name: 'Genshin Impact',
    }
  ]
}
