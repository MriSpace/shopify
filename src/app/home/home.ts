import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from '../header/header';
import { ProductView } from "../product-view/product-view";
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'app-home',
  imports: [Header, ProductView],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit {
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private productsService: ProductsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Failed to load products';
          this.loading = false;
          this.cdr.detectChanges();
          console.error('Error loading products:', err);
        }
      });
  }
}
