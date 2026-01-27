import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header  implements OnInit{
  username = ' ';

  constructor(private router: Router){}

  ngOnInit(){
    const user = localStorage.getItem('user');
    if(user){
      this.username = JSON.parse(user).username;
      console.log(user)
    }
  }

  logout(){
    this.router.navigate(['/login'],{replaceUrl:true})
  }

}
