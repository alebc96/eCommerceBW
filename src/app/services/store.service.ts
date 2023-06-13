import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Product, ProductForm } from '../interfaces/Product';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json ' }),
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${environment.BASE_URL}/products`)
  }

  getProductById(id: number): Observable<Product>{
    const url = `${environment.BASE_URL}/products/${id}`
    return this.http.get<Product>(url)
  }

  postProduct(product: ProductForm): Observable<ProductForm>{
    return this.http.post<ProductForm>(`${environment.BASE_URL}/products`, product, httpOptions)
  }
}
