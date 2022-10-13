import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AngularDelegate, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { Throttle } from './services/throttle.service';

const routes: Routes = [
  {
    path: 'a',
    loadChildren: () => import('./alpha/alpha.module').then(m => m.AlphaPageModule),
  },
  {
    path: 'b',
    loadChildren: () => import('./bravo/bravo.module').then(m => m.BravoPageModule),
  },
  {
    path: '',
    redirectTo: '/a/home',
    pathMatch: 'full',
  },
];

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    AngularDelegate,
    SplashScreen,
    StatusBar,
    { provide: HTTP_INTERCEPTORS, useClass: Throttle, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class AppModule {}
