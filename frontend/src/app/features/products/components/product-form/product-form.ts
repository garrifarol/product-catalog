import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../../categories/services/categories-service';
import { Category } from '../../../categories/models/categories.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/products.model';
import { Snackbar } from '../../../../shared/services/snackbar/snackbar';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ConfirmDialog } from '../../../../shared/services/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  id = input<string>('');
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private snackbarService = inject(Snackbar);
  private confirmDialogService = inject(ConfirmDialog);

  private productResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => {
      if (!params.id) return of(null);
      return this.productsService.getProductById(params.id);
    },
  });

  product = this.productResource.value;
  categories = this.categoriesService.categories;
  isEditMode = computed(() => !!this.id());

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    categoryId: ['', Validators.required],
  });

  redirectIfNotFoundEffect = effect(() => {
    if (this.id() && this.productResource.error()) {
      this.snackbarService.open('Product not found');
      this.router.navigate(['/products']);
    }
  });

  patchEffect = effect(() => {
    const product = this.product();
    if (!product) return;
    this.form.patchValue({
      name: product?.name,
      price: product?.price,
      categoryId: product?.category.id,
    });
  });

  ngOnInit() {
    this.categoriesService.searchCategories();
  }

  confirmSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.confirmDialogService
      .confirm({
        title: this.isEditMode() ? `Update ${this.product()?.name}?` : 'Create Product?',
        message: this.isEditMode()
          ? 'Are you sure you want to update this product?'
          : 'Are you sure you want to create this product?',
        confirmText: this.isEditMode() ? 'Update' : 'Create',
        cancelText: 'Cancel',
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.submit();
        }
      });
  }

  submit() {
    const payload = this.form.getRawValue();

    const request$ = this.isEditMode()
      ? this.productsService.updateProduct(this.product()!.id, payload)
      : this.productsService.createProduct(payload);

    request$.subscribe({
      next: () => {
        this.snackbarService.open(
          this.isEditMode() ? 'Product updated successfully' : 'Product created successfully'
        );
        this.router.navigate(['/products']);
      },
      error: () => {
        this.snackbarService.open(
          this.isEditMode() ? 'Failed to update product' : 'Failed to create product'
        );
      },
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
