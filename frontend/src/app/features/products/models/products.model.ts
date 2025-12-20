import { Category } from '../../categories/models/categories.model';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUpdateProduct {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
}
