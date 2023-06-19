import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public cart: Product[] = [];
  public showCart = false;
  public total = 0;
  public isLogged = false;
  public userRole: string = ''

  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    const user = this.userService.getSession()
    if(user === undefined) return
    else this.userService.logged.subscribe( res => {
      console.log(res)
      if(res || this.userService.getSession() !== undefined){
        this.isLogged = true
        
      }
    })
  }

  onCheckRole(){
    const user = this.userService?.getSession()
    if(user !== undefined) this.userRole = user?.role
    else this.userRole = ''
    return this.userRole
  }

  onShowCart(): void {
    this.showCart = true;
  }

  onCloseCart(): void {
    this.showCart = false;
  }

  onGetTotal(cart: Product[]): number {
    return this.cartService.getTotalPayment(cart);
  }

  onDeleteAll() {
    this.cartService.clearCart();
  }

  moveToCart() {
    this.showCart = false;
    this.router.navigate(['/cart']);
  }

  getTotalItems(cart: Product[]): number {
    let total = 0;
    return cart.reduce((prev, current) => prev + current.quantity, total);
  }

  onLogged(): boolean {
    return this.userService.isLogged();
  }

  logout(): void{
    this.userService.clearSession()
    this.router.navigate(['/home'])
    this.isLogged = false
    this.cartService.clearCart()
    this.userService.logged.next(false)
  }
}
