import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { Search } from 'src/app/interfaces/Search';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public productsCopy: Product[] = [];
  public productsSubscription: Subscription | undefined;
  public cart: Product[] | undefined;
  public showFilters: boolean = false;

  constructor(
    private storeService: StoreService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsSubscription = this.storeService.getAllProducts().subscribe({
      next: (_products) => {
        this.products = _products;
        this.productsCopy = _products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  searchProduct(event: any) {
    const text: string = event?.target?.value;
    this.products = this.productsCopy?.filter(({ name }: Product) => {
      return name.toLowerCase().includes(text.toLowerCase());
    });
  }

  onCategorySelected(category: string): void {
    console.log({ category });
  }

  onLowPriceSelected(low: string): void {
    console.log({ low });
    if (low === '') {
      low = '0';
    }
    this.filterByPriceLow(Number.parseFloat(low));
  }

  onHightPriceSelected(hight: string): void {
    if (hight === '') hight = '9999999';
    this.filterByPriceHight(Number.parseFloat(hight));
  }

  filterByPriceLow(low: number): void {
    this.products = this.productsCopy.filter(({ price }: Product) => {
      return price >= low;
    });
  }

  filterByPriceHight(hight: number): void {
    this.products = this.productsCopy.filter(({ price }: Product) => {
      return price <= hight;
    });
  }

  onSearchByPrice(search: Search) {
    if (
      (search.lowPrice == 0 ||
      search.lowPrice === null) && (search.hightPrice == 0 ||
      search.hightPrice === null)
    ) {
      this.products = this.productsCopy;
      return;
    }
    this.products = this.productsCopy.filter(({ price }: Product) => {
      return price >= search.lowPrice && price <= search.hightPrice;
    });
  }

  onShow(): void{
    this.showFilters = !this.showFilters
  }

  //Mantener al final del componente
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription?.unsubscribe();
    }
  }
}
