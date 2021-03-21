import { Component, OnInit } from '@angular/core';
import {ProductCategory} from 'src/app/common/product-category';
<<<<<<< HEAD
<<<<<<< HEAD
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit 
{
  productCategories: ProductCategory[];

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private productService: ProductService, private productCatgoryMenuService: ProductCategoryMenuService) 
=======
  constructor(private productService: ProductService) 
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
  constructor(private productService: ProductService) 
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
  {
  }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
