import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public cart: Product[]  = []
  public showCart = false;
  public total = 0

  constructor(private cartService: CartService, private router: Router){}



  ngOnInit(): void {
    this.cartService.cart.subscribe({
      next: data => {
        this.cart = data
      }
    })
    
  }

  onShowCart(): void{
    this.showCart = true
  }

  onCloseCart():void{
    this.showCart = false
  }

  onGetTotal(cart: Product[]): number{
    return this.cartService.getTotalPayment(cart)
  }

  onDeleteAll(){
    this.cartService.clearCart()
  }

  moveToCart(){
    this.showCart = false
    this.router.navigate(['/cart'])
  }

  getTotalItems(cart: Product[]): number {
    let total = 0;
    return cart.reduce((prev, current) => prev + current.quantity, total);
  }
  

}
