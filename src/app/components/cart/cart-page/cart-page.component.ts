import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{

  public cart: Product[] = []

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cart.subscribe({
      next: _cart => {
        this.cart = _cart
      }
    })
  }

  onGetTotal(cart: Product[]): number{
    return this.cartService.getTotalPayment(cart)
  }

  clearCart(){
    this.cartService.clearCart()
  }

}
