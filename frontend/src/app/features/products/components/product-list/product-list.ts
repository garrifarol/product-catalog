import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../models/products.model';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../../../categories/services/categories-service';
import { Category } from '../../../categories/models/categories.model';
import { RouterLink } from '@angular/router';
import { Snackbar } from '../../../../shared/services/snackbar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, MatButtonModule, MatSelectModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private productsService = inject<ProductsService>(ProductsService);
  private categoriesService = inject<CategoriesService>(CategoriesService);
  private snackbarService = inject<Snackbar>(Snackbar);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | null>(null);

  displayedColumns: string[] = ['product', 'price', 'category', 'actions'];

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    const categoryId = this.selectedCategory()?.id;

    this.productsService.getProducts(categoryId).subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: () => {
        this.snackbarService.open('Failed to load products');
      },
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
        this.snackbarService.open('Failed to load categories');
      },
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: () => {
        this.snackbarService.open('Failed to delete product');
      },
    });
  }

  onCategoryChange(category: Category | null) {
    this.selectedCategory.set(category);
    this.loadProducts();
  }

  resetFilter() {
    this.selectedCategory.set(null);
    this.loadProducts();
  }
}
