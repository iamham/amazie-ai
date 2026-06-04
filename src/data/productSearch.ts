import { PRODUCTS } from './products.js';
import type { Product } from '../types.js';

/**
 * Local product search used as the `searchProducts` tool implementation.
 * Filters the embedded Amaze catalog by a case-insensitive name match.
 */
export const searchProducts = (query?: string): Product[] => {
  let results = PRODUCTS;
  if (query) {
    const q = query.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(q));
  }
  return results;
};
