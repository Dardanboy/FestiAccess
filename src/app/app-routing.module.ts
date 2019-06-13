import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'contact/:id', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'connection', loadChildren: './connection/connection.module#ConnectionPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionPageModule' },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
