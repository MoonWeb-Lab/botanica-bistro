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

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface DeliveryOrderState {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  street: string;
  house: string;
  apartment: string;
  entrance?: string;
  floor?: string;
  comment: string;
  paymentMethod: 'card_online' | 'card_courier' | 'cash';
  deliveryTime: 'asap' | 'scheduled';
  scheduledTime?: string;
}
