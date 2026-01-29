import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Auth } from '../common/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header implements OnInit {
  @Input() user:any ={};
  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
    console.log(this.user);
  }

  logout() {
    this.auth.logout(); //  remove token + user from storage
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
