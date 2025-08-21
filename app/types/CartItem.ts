import type { Product }   from './Product';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}