import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';
import { Header } from '../header/header';
import { Auth } from '../common/services/auth';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, CurrencypipePipe, Header],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{
  product: any;
  loading = true;
  user: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: Auth) {}

  ngOnInit() {
    this.getUserInfo();
    const id = this.route.snapshot.paramMap.get('productId');
    this.http.get(`https://dummyjson.com/products/${id}`)
      .subscribe((data) => {
        this.product = data;
        this.loading = false;
      });
  }

  getUserInfo() {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res;
    }, error => {
      this.user = {};
    })
  }
}
