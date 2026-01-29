import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ProductDetails } from './product-details/product-details';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home, canActivate: [authGuard]},
    { path: 'login', loadComponent: () => import('./login/login').then(m=>m.Login), canActivate: [loginGuard] },
    { path: 'signup', component: Signup},
    {path: 'product/:productId', component: ProductDetails},
    { path: '**', component: Home }
    
];
