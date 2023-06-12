import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit{

  @Input() item: Product | undefined

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    
  }

  onAddQuantity(item: Product){
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: Product): void{
    this.cartService.removeFromCart(item)
  }
  
  onDeleteProduct(item: Product){
    this.cartService.clearCartItem(item)
  }
}
