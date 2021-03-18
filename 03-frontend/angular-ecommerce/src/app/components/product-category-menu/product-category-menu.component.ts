import { Component, OnInit } from '@angular/core';
import {ProductCategory} from 'src/app/common/product-category';
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit 
{
  productCategories: ProductCategory[];

  constructor(private productService: ProductService, private productCatgoryMenuService: ProductCategoryMenuService) 
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
