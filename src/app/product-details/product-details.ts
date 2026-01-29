import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, CurrencypipePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{
  product: any;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('productId'); // 👈 get ID from URL

    this.http.get(`https://dummyjson.com/products/${id}`)
      .subscribe((data) => {
        this.product = data;
        this.loading = false;
      });
  }

}
