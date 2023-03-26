import { Component, OnInit } from '@angular/core';
import { BggDataService } from "./services/bgg-data.service";
import { BggGame } from "./models/bgg-game.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'board-game-index';
  games?: BggGame[];
  private username = 'ambitnanazwa';

  constructor(private bggData: BggDataService) {
  }

  ngOnInit(): void {
    // On component initialisation, fetch games from service
    this.bggData.fetchUserGames(this.username).then(data => {
      console.log('Merged data', data);
      this.games = data;
    });
  }


}
