export type ProductModel = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  brand: string;
  attributes?: Array<{ key: string; value: any }>;
  createdAt: string;
  updatedAt: string;
};
