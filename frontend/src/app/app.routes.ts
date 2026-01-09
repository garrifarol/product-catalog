import { Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/components/product-list/product-list').then((m) => m.ProductList),
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('./features/products/components/product-form/product-form').then((m) => m.ProductForm),
  },
  {
    path: 'products/:id/edit',
    loadComponent: () =>
      import('./features/products/components/product-form/product-form').then((m) => m.ProductForm),
  },
  {
    path: '**',
    component: NotFound,
  },
];
