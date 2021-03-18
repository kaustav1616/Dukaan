import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
=======
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

<<<<<<< HEAD
  constructor(private httpClient: HttpClient) 
  {
  }

  getProductList(theCategoryId: number): Observable<Product[]> 
  {
=======
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
<<<<<<< HEAD

=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

<<<<<<< HEAD
  private getProducts(searchUrl: string): Observable<Product[]> 
  {
=======
  private getProducts(searchUrl: string): Observable<Product[]> {
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

<<<<<<< HEAD
  getProductCategories(): Observable<ProductCategory[]> 
  {
=======
  getProductCategories(): Observable<ProductCategory[]> {

>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(name: string): Observable<Product[]>
  {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, thePageSize: number, name: string): Observable<GetResponseProducts>
  {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}` + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProduct(theProductId: number): Observable<Product> 
  {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  // response metadata
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}