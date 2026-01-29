import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule as CM } from '@angular/common';
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';
import { Pagenation } from '../pagenation/pagenation';
import { ProductsService } from '../common/services/products.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-view',
  imports: [CM, RouterLink, CurrencypipePipe, Pagenation ],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
  standalone: true
})
export class ProductView implements OnInit, OnChanges, OnDestroy {
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  private destroy$ = new Subject<void>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnChanges(): void {
    // Reset to page 1 when products change
    this.currentPage = 1;
    this.updateFilteredProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchProducts(): void {
    this.productsService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.loading = false;
          this.updateFilteredProducts();
        },
        error: (err) => {
          this.error = 'Failed to load products';
          this.loading = false;
          console.error('Error loading products:', err);
        }
      });
  }

  updateFilteredProducts(): void {
    if (this.products && this.products.length > 0) {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.filteredProducts = this.products.slice(start, end);
    }
  }

  onPageChange(change: any) {
    // Handle page change event from pagination component
    console.log('Page changed:', change);
    this.currentPage = change.page;
    this.filteredProducts = this.products.slice(change.start, change.end);
  }
}

