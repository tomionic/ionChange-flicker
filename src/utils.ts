import { Type } from '@angular/core';
import { cordova, CordovaOptions, PluginConfig } from '@awesome-cordova-plugins/core';

export function getTag<T>(component: Type<T>): string {
  return (component as any).ɵcmp.selectors[0][0];
}

export function observeChildren<T extends Node>(target: T): Promise<T> {
  return new Promise(
    resolve => {
      const observer = new MutationObserver(
        () => {
          observer.disconnect();
          resolve(target);
        },
      );
      observer.observe(target, { childList: true });
    },
  );
}

export function Memoize(): MethodDecorator {
  return (target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    let result = void 0;
    let memoed = false;
    return {
      ...descriptor,
      value(): unknown {
        if (!memoed) {
          result = descriptor.value.apply(this, arguments);
          memoed = true;
        }
        return result;
      },
    };
  };
}

export function Cordova(options?: CordovaOptions): MethodDecorator {
  return (target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return {
      ...descriptor,
      value(): unknown {
        return cordova(this, key, options, arguments);
      },
    };
  };
}

export function Plugin(options: PluginConfig): ClassDecorator {
  return (target: object): void => {
    Object.assign(target, options);
  };
}
