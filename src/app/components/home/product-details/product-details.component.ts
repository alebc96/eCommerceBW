import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public product!: Product;
  private productSubscription: Subscription | undefined
  private cartItemSubscription: Subscription | undefined

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productSubscription = this.storeService
      .getProductById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (_product) => {
          if(this.cartService.productInCart(_product)){
            const productFinded = this.cartService.getProductById(_product.id)
            if(productFinded !== undefined){
              this.product = productFinded
            }
          }else{
            this.product = _product;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  productInCart(id: number){
    this.cartItemSubscription = this.cartService.cart.subscribe({
      next: data => {
        const productFinded = data.find(item => item.id !== id)
        console.log(productFinded)
        if(productFinded !== undefined){
          this.product = productFinded
        }
      }
    })
  }

  onAddProduct(product: Product): void {
    if(product !== undefined){
      this.cartService.addToCart(product)
    }
  }

  onRemoveProduct(product: Product): void {
    if(product !== undefined){
      this.cartService.removeFromCart(product)
    }
  }

  ngOnDestroy(): void {
    if(this.productSubscription !== undefined){
      this.productSubscription.unsubscribe()
    }
    if(this.cartItemSubscription !== undefined){
      this.cartItemSubscription.unsubscribe()
    }
  }


}
