export interface OrganizationModel {
  _id: string;
  name: string;
  admin: string;
  description?: string;
  members: string[]; // Assuming members are stored as user IDs
  products: string[]; // Assuming products are stored as product IDs
  orders: string[]; // Assuming orders are stored as order IDs
  createdAt: string;
  updatedAt: string;
}
