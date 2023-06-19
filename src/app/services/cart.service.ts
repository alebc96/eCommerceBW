import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/Product';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = new BehaviorSubject<Product[]>([])

  constructor(private toast: ToastrService) { }

  addToCart(product: Product){
    const products = [...this.cart.value]
    const itemFinded = products.find((item: Product) => item.id === product.id)
    if(!itemFinded){
      product.quantity = 1
      products.push(product)
    }else{
      itemFinded.quantity += 1
    }
    this.toast.success("Item added to cart", "Ok :)", {timeOut: 1000, positionClass: 'toast-bottom-left'})
    this.cart.next(products)
  }

  removeFromCart(item: Product): void{
    const products = [...this.cart.value]
    products.map((_item) => {
      if(_item.id === item.id){
        if(_item.quantity <= 0){
          this.clearCartItem(_item)
        }else{
          _item.quantity -= 1
          this.toast.warning("Item remove from cart", "Ok :)", {timeOut: 1000, positionClass: 'toast-bottom-left'})
        }
      }
    })
  }

  clearCart(): void{
    this.cart.next([])
    this.toast.warning("Item remove from cart", "Ok :)", {timeOut: 1000, positionClass: 'toast-bottom-left'})
  }

  clearCartItem(item: Product): void {
    const filteredProducts = this.cart.value.filter((_item: Product) => {
      return _item.id !== item.id
    })
    this.cart.next(filteredProducts)
    this.toast.warning("Item remove from cart", "Ok :)", {timeOut: 1000, positionClass: 'toast-bottom-left'})
  }

  getTotalPayment(items: Product[]): number{
    return items.map((_item) => {
    return  _item.price * _item.quantity;
    }).reduce((prev, current) => prev + current, 0)
  }

  productInCart( product: Product): boolean{
    const itemFinded: Product | undefined = this.cart.value.find((_item) => {
      return _item.id === product.id
    })
    if(itemFinded !== undefined){
      return true
    }else{
      return false
    }
  }

  getProductById(id: number): Product | undefined{
    const itemFinded: Product | undefined = this.cart.value.find((_item) => {
      return _item.id === id
    })
    return itemFinded
  }

}
