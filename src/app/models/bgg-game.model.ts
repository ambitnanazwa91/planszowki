/**
 * Simplified game-oriented BggThingDto
 * with user-specific data from BggCollectionItemDto
 */
export interface BggGame {
  id: number;
  name: string; // Localised name, e.g. 'Pory Roku'
  originalName: string; // Non-localised name, e.g. 'Seasons'
  description: string;
  image: string;
  thumbnail: string; // Image, but reduced size
  yearPublished: number;
  status: { own: boolean, want: boolean, wishlist: boolean }
  categories: string[];
  mechanics: string[];
  players: { min: number, max: number };
  playingTime: { min: number, max: number, avg: number }
  rating: number;
  rank: number;
}
