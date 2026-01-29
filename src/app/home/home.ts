import { Component, OnInit, OnDestroy } from '@angular/core';
import { Header } from '../header/header';
import { ProductView } from "../product-view/product-view";
import { ProductsService } from '../common/services/products.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Auth } from '../common/services/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, ProductView],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit, OnDestroy {
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  user:any = {}
  name:string = 'test'
  constructor(private productsService: ProductsService,private auth:Auth, public route: Router) {}

  ngOnInit() {
    this.fetchProducts();
    this.getUserInfo();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getUserInfo(){
    this.auth.getUser().subscribe((res:any)=>{
      console.log(res)
      this.user = res;
      this.name=res.firstName;
    },error=>{
      console.log(error)
      this.user = {};
      this.route.navigate(['/'])
    })
  }
  fetchProducts() {
    this.productsService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products';
          this.loading = false;
          console.error('Error loading products:', err);
        }
      });
  }
}
