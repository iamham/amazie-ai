export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system',
}

export interface Product {
  sku: number;
  name: string;
  name_th: string;
  description: string;
  imageURL: string;
}

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  image?: string;
  products?: Product[];
}

export interface GeminiReply {
  text: string;
  products?: Product[];
}
