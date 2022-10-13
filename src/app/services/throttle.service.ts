import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Throttle implements HttpInterceptor {
  private actions: { [_: string]: boolean } = {};

  private lock<T>(request: HttpRequest<T>): boolean {
    switch (request.method) {
      case 'DELETE':
      case 'PATCH':
      case 'POST':
      case 'PUT':
        if (!this.actions[request.url]) {
          this.actions[request.url] = true;
        } else {
          return false;
        }
    }
    return true;
  }

  private unlock<T>(request: HttpRequest<T>): void {
    this.actions[request.url] = false;
  }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    if (!this.lock(request)) {
      throw new Error(`Limit reached for ${request.url}`);
    }
    return next.handle(request).pipe(finalize(() => this.unlock(request)));
  }
}
