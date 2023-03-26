import { Injectable } from '@angular/core';
import { BggClient } from "boardgamegeekclient";
import { BggGame } from "../models/bgg-game.model";

/**
 * Service fetching data directly from BoardGameGeek portal
 */
@Injectable({
  providedIn: 'root'
})
export class BggDataService {

  private client = BggClient.Create();

  constructor() {
  }

  async fetchUserGames(username: string): Promise<BggGame[]> {
    let data = await this.client.collection.query({ username });
    if (!data?.length) {
      throw new Error('Empty user collection');
    }
    const collectionGames = data[0].items;
    console.log('User collection', collectionGames);
    const gameIds = collectionGames.map(game => game.objectid);
    try {
      let gamesDetails = await this.client.thing.query({
        id: gameIds,
        stats: 1,
        type: "boardgame"
      });
      console.log('Games details', gamesDetails);
      return gamesDetails.map(game => {
        const userGame = collectionGames.find(g => g.objectid === game.id);
        const result: BggGame = {
          id: game.id,
          name: userGame!.name,
          originalName: userGame!.originalname ?? userGame!.name,
          description: game.description,
          image: game.image,
          thumbnail: game.thumbnail,
          yearPublished: game.yearpublished,
          status: {
            own: !!userGame!.status.own,
            wishlist: !!userGame!.status.wishlist,
            want: !!userGame!.status.want,
          },
          categories: game.links.filter(link => link.type === 'boardgamecategory').map(link => link.value),
          mechanics: game.links.filter(link => link.type === 'boardgamemechanic').map(link => link.value),
          players: { min: game.minplayers, max: game.maxplayers },
          playingTime: { min: game.minplaytime, max: game.maxplaytime, avg: game.playingtime },
          rating: game.statistics.ratings.average,
          rank: game.statistics.ratings.ranks.find(r => r.id === 1)?.value ?? 0,
        };
        return result;
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
