import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { NewProduct } from '../interfaces/newProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = `${environment.api}/products`;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  addProduct(product: NewProduct, accessToken: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', `Bearer ${accessToken}`);

    return this.http.post(this.productsUrl, product, { headers });
  }

  updateProduct(id: string, product: Partial<Product>, accessToken: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', `Bearer ${accessToken}`);

    return this.http.put(`${this.productsUrl}/${id}`, product, { headers });
  }

  deleteProduct(id: string, accessToken: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', `Bearer ${accessToken}`);

    return this.http.delete(`${this.productsUrl}/${id}`, { headers });
  }
}
