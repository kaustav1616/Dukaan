import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, Observable } from 'rxjs';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import {CartProduct} from '../common/cart-product';
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItems: CartItem[] = [];
<<<<<<< HEAD
  cartProductList: CartProduct[] = []; // stores shopping cart
  thePageNumber: number = 1; // initialized with 1 because when component is loaded for first time, it displays page 1 of category 1
  thePageSize: number = 5;
  theTotalElements: number = 0;
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  postData = {};
  totalPriceValue: number = 0;
  totalQuantityValue: number = 0;

  constructor(public httpClient: HttpClient)
  {
    const getURL = `http://localhost:8080/api/shopping-carts`;

    // get data
    this.httpClient.get<GetResponseShoppingCartProducts>(getURL).subscribe(data =>
    {
      this.cartProductList = data._embedded.shoppingCarts;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      console.log(`number of items in cart = ${this.cartProductList.length}`);

      // calculate cart parameters (quantity and total cost)
      this.getCartDetailsProcessed(); 
      });
  }

  // GET request for fetch cart products
  getCartDetails(): Observable<GetResponseShoppingCartProducts>
  {
    const getURL = `http://localhost:8080/api/shopping-carts`;

    return this.httpClient.get<GetResponseShoppingCartProducts>(getURL);
  }

  // POST request for delete product from cart
  deleteFromCart(id: string)
  {
    const deleteURL = `http://localhost:8080/removeFromCart/${id}`;
    const getURL = `http://localhost:8080/api/shopping-carts`;

    this.httpClient.delete(deleteURL).subscribe(res =>
    {
      // get data
      // console.log(`id: ${id}`);
      // this.httpClient.get<GetResponseShoppingCartProducts>(getURL).subscribe(data =>
      // {
      //   this.cartProductList = data._embedded.shoppingCarts;
      //   this.thePageNumber = data.page.number + 1;
      //   this.thePageSize = data.page.size;
      //   this.theTotalElements = data.page.totalElements;
      //   console.log(`number of items in cart = ${this.cartProductList.length}`);

      //   // calculate cart parameters (quantity and total cost)
      //   this.getCartDetailsProcessed(); 
      // });
    });
  }

  // POST request for add product to cart
  addToCart(id: string)
  {
    const addURL = `http://localhost:8080/addToCart/${id}`;
    const getURL = `http://localhost:8080/api/shopping-carts`;

    this.httpClient.post(addURL, null).subscribe(res =>
    {
      // get data
      this.httpClient.get<GetResponseShoppingCartProducts>(getURL).subscribe(data =>
      {
        this.cartProductList = data._embedded.shoppingCarts;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
        console.log(`number of items in cart = ${this.cartProductList.length}`);

        // calculate cart parameters (quantity and total cost)
        this.getCartDetailsProcessed(); 
      });
    });
  }

  // process the result written by the backend API
  processResult()
  {
    return data =>
    {
      this.cartProductList = data._embedded.shoppingCarts;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  getCartDetailsProcessed()
  {
=======
  cartProductList: Product[] = [];
  thePageNumber: number = 1; // initialized with 1 because when component is loaded for first time, it displays page 1 of category 1
  thePageSize: number = 5;
  theTotalElements: number = 0;

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  postData = {};

  constructor(private httpClient: HttpClient)
  {
  }

  /*
  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }
   */

  // POST request for add product to cart
  addToCart(product: Product)
  {
    const cartUrl = `http://localhost:8080/addToCart/${product.id}`;

    this.httpClient.post(cartUrl, this.postData).toPromise().then(data =>
    {
      console.log(data);
    })

    this.getCartDetailsProcessed();
  }

  // process the cart data received from backend
  getCartDetailsProcessed()
  {
    this.getCartDetails().subscribe(this.processResult());
    // this.getCartDetails().subscribe();
    // console.log(`List of cart products: ${this.cartProductList.length}`);

>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    let duplicateCartItem: CartItem = null;
    let newCartItem: CartItem = null;

    // create array of CartItem[] objects
    this.cartItems = [];

    for(let cartProduct of this.cartProductList)
    {
      console.log(`name = ${cartProduct.name}`);
<<<<<<< HEAD

=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
      if(this.cartItems.length > 0)
        duplicateCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == cartProduct.id);

      if(duplicateCartItem != null)
        ++duplicateCartItem.quantity;
      else
      {
        newCartItem = new CartItem(cartProduct);
        this.cartItems.push(newCartItem);
      }
    }

    this.computeCartTotals();
  }

<<<<<<< HEAD
  computeCartTotals()
  {
    this.totalPriceValue = 0;
    this.totalQuantityValue = 0;
    
    for (let currentCartItem of this.cartItems)
    {
      this.totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      this.totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(this.totalPriceValue);
    this.totalQuantity.next(this.totalQuantityValue);

    // log cart data just for debugging purposes
    // this.logCartData(totalPriceValue, totalQuantityValue);
=======
  // GET request for fetch cart products
  getCartDetails(): Observable<GetResponseShoppingCartProducts>
  {
    const cartUrl = `http://localhost:8080/api/shopping-carts`;

    return this.httpClient.get<GetResponseShoppingCartProducts>(cartUrl);
  }

  // process the result written by the backend API
  processResult()
  {
    return data =>
    {
      this.cartProductList = data._embedded.shoppingCarts;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  computeCartTotals()
  {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems)
    {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number)
  {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems)
    {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }
}

<<<<<<< HEAD
// structure of products data
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
interface GetResponseProducts
{
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

<<<<<<< HEAD
// structure of shopping cart data
interface GetResponseShoppingCartProducts
{
  _embedded:
  {
    shoppingCarts: CartProduct[];
  },
  // response metadata
  page: 
  {
=======
interface GetResponseShoppingCartProducts
{
  _embedded: {
    shoppingCarts: Product[];
  },
  // response metadata
  page: {
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}