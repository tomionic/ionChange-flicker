import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const routes = createRoutes(
  {
    signIn: 'SignIn',
  },
);

interface HttpOptions {
  headers?: { [_: string]: string | string[] };
  params?: { [_: string]: string | number | boolean | (string | number | boolean)[] };
  withCredentials?: boolean;
}

function createRoutes<T extends { [_: string]: string }>(map: T): T {
  return Object.fromEntries(Object.entries(map).map(tuple => [tuple[0], `/Api/${tuple[1]}/`])) as T;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {
  }

  //#region Core
  createHttpOptions(): HttpOptions {
    return {
      withCredentials: true,
    };
  }
  //#endregion
}
