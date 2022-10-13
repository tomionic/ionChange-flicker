import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class Navigation {
  constructor(private location: Location, private navigation: NavController) {
  }

  getState<T>(): T {
    return this.location.getState() as T;
  }

  back(): Promise<boolean> {
    return this.navigation.pop().then(() => true);
  }
}
