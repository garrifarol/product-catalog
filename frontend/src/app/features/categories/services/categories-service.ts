import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/categories.model';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/v1/categories`;
  private categoriesResource = rxResource({
    defaultValue: [],
    stream: () => {
      return this.getCategories();
    },
  });

  private getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  categories = this.categoriesResource.value;
  isLoading = this.categoriesResource.isLoading;
  error = this.categoriesResource.error;

  searchCategories() {
    this.categoriesResource.reload();
  }
}
