import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { LogoutService } from 'src/app/services/logout.service';
import { CartStatusService } from 'src/app/services/cart-status.service';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1; // initialized with 1 because when component is loaded for first time, it displays page 1 of category 1
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousKeyword: string = null;

  constructor(private productService: ProductService, private cartService: CartService,
    private route: ActivatedRoute, private logoutService: LogoutService, 
    private productCategoryMenuService: ProductCategoryMenuService, private seachBarService: SearchBarService, 
    private cartStatusService: CartStatusService) 
    { 
      console.log("here");
    }

  ngOnInit() {
    this.logoutService.activate(); // communicates through LogoutService to LogoutComponent, asking it to disable itself
    this.productCategoryMenuService.activate();
    this.seachBarService.activate();
    this.cartStatusService.activate();
    
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    if(this.previousKeyword != theKeyword) // different search keyword to previous search keyword
      this.thePageNumber = 1;

    this.previousKeyword = theKeyword;

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) // particular category selected by clicking on sidebar
    {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else // page loaded on app opening
    {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());

    console.log(`Products: ${this.products.length}`);
  }

  addToCart(theProduct: Product)
  {
    this.cartService.addToCart(theProduct.id);
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
}