import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StripeComponent } from './stripe/stripe.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'home',
        component: ProductComponent
    },

    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'stripe',
        component: StripeComponent
    },
    {
        path: 'transaction',
        component: TransactionComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
