import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../../categories/services/categories-service';
import { Category } from '../../../categories/models/categories.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/products.model';
import { Snackbar } from '../../../../shared/services/snackbar';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private snackbarService = inject(Snackbar);

  product = signal<Product | null>(null);
  categories = signal<Category[]>([]);
  isEditMode = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    categoryId: ['', Validators.required],
  });

  ngOnInit() {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loadProduct(id);
    } else {
      this.isEditMode.set(false);
    }
  }

  loadProduct(id: string) {
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.form.patchValue({
          name: product.name,
          price: product.price,
          categoryId: product.category.id,
        });
      },
      error: () => {
        this.snackbarService.open('Failed to load product');
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

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
