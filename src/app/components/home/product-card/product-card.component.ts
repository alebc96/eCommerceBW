import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  @Input() product: Product |undefined
  @Output() addToCart = new EventEmitter<Product>()

  constructor(private cartService : CartService, private router: Router){}

  ngOnInit(): void {
    this.product?.price
  }

  onAddToCart(product: Product){
    this.cartService.addToCart(product)
  }
  moveToDetails(id: number): void{
    this.router.navigate([`products/${id}`])
  }

}
