import { Component, OnInit } from '@angular/core';
import { CartStatusService } from 'src/app/services/cart-status.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private theCartService: CartService, private cartStatusService: CartStatusService) { }

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
}