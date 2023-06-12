import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Product, ProductForm } from '../interfaces/Product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json ' }),
};

const BASE_URL = " http://localhost:8080/products"

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(BASE_URL)
  }

  getProductById(id: number): Observable<Product>{
    const url = `${BASE_URL}/${id}`
    return this.http.get<Product>(url)
  }

  postProduct(product: ProductForm): Observable<ProductForm>{
    return this.http.post<ProductForm>(BASE_URL, product, httpOptions)
  }
}
