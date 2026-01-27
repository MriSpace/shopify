import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ProductDetails } from './product-details/product-details';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home},
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    {path: 'product/:productId', component: ProductDetails},
    { path: '**', component: Home }
    
];
