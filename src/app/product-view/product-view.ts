import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule as CM } from '@angular/common';
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';
import { Pagenation } from '../pagenation/pagenation';

@Component({
  selector: 'app-product-view',
  imports: [CM, RouterLink, CurrencypipePipe,Pagenation ],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
  standalone: true
})
export class ProductView {
  @Input() products: any[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;



}

