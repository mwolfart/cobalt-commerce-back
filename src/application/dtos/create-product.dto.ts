export type CreateProductDto = {
  name: string;
  price: number;
  qty: number;
  description?: string;
  image?: string;
  categoryIds?: string[];
};
