export interface Dish {
  id: string;
  name: string;
  description: string;
  category: 'starters' | 'mains' | 'pasta' | 'desserts' | 'wines';
  price: number;
  weight: string;
  image: string;
  tags: ('chef' | 'vegan' | 'gluten-free' | 'seafood')[];
  winePairing?: string;
  calories?: number;
}

export interface SeatingZone {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  capacity: string;
  features: string[];
}

export interface ReservationState {
  zoneId: string;
  date: string;
  time: string;
  guestsCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  occasion: string;
  wishes: string;
}

export interface WineItem {
  id: string;
  name: string;
  type: 'red' | 'white' | 'sparkling' | 'rose';
  region: string;
  vintage: string;
  priceBottle: number;
  priceGlass?: number;
  grape: string;
  notes: string;
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  source: string;
  date: string;
  favoriteDish: string;
}
