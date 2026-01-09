import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductsService } from '../../services/products-service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../../../categories/services/categories-service';
import { Category } from '../../../categories/models/categories.model';
import { RouterLink } from '@angular/router';
import { Snackbar } from '../../../../shared/services/snackbar/snackbar';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialog } from '../../../../shared/services/confirm-dialog/confirm-dialog';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    CurrencyPipe,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    MatProgressBarModule,
    NgClass,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private snackbarService = inject(Snackbar);
  private confirmDialogService = inject(ConfirmDialog);

  private productsResource = rxResource({
    params: () => ({ id: this.selectedCategory()?.id }),
    defaultValue: [],
    stream: ({ params }) => {
      return this.productsService.getProducts(params.id);
    },
  });

  products = this.productsResource.value;
  productsIsLoading = this.productsResource.isLoading;
  selectedCategory = signal<Category | null>(null);
  categories = this.categoriesService.categories;
  deletingProductId = signal<string>('');

  displayedColumns: string[] = ['product', 'price', 'category', 'actions'];

  ngOnInit() {
    this.categoriesService.searchCategories();
  }

  confirmDelete(product: Product) {
    this.confirmDialogService
      .confirm({
        title: `Delete ${product.name}?`,
        message: 'Are you sure you want to delete this product?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        danger: true,
      })
      .subscribe((isConfirmed) => {
        if (!isConfirmed) return;
        this.deleteProduct(product.id);
      });
  }

  deleteProduct(id: string) {
    this.deletingProductId.set(id);
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update((products) => products.filter((p) => p.id !== id));
        this.productsResource.reload();
        this.snackbarService.open('Product deleted successfully');
        this.deletingProductId.set('');
      },
      error: () => {
        this.snackbarService.open('Failed to delete product');
        this.deletingProductId.set('');
      },
    });
  }

  onCategoryChange(category: Category) {
    this.selectedCategory.set(category);
  }

  resetFilter() {
    this.selectedCategory.set(null);
  }
}
