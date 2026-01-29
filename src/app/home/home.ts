import { Component, OnInit, OnDestroy } from '@angular/core';
import { Header } from '../header/header';
import { ProductView } from '../product-view/product-view';
import { Subject } from 'rxjs';
import { Auth } from '../common/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, ProductView],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit, OnDestroy {
  user: any = {}
  name: string = 'test'
  private destroy$ = new Subject<void>();

  constructor(private auth: Auth, public route: Router) {}

  ngOnInit() {
    this.getUserInfo();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserInfo() {
    this.auth.getUser().subscribe((res: any) => {
      console.log(res)
      this.user = res;
      this.name = res.firstName;
    }, error => {
      console.log(error)
      this.user = {};
      this.route.navigate(['/login'])
    })
  }
}
