import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CartStatusService } from 'src/app/services/cart-status.service';
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

<<<<<<< HEAD
  constructor(private theCartService: CartService, private cartStatusService: CartStatusService) { }
=======
  constructor(private theCartService: CartService) { }
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.theCartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.theCartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
