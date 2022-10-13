import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  ActionSheetOptions,
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { defer, Observable, of, zip } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

class CallbackError {
  constructor(public error: Error) {
  }
}

function createLoad<T, V>(present: () => Promise<T>, dismiss: () => Promise<T>, load: () => Observable<V>): Observable<V> {
  const onFindButtons = (): HTMLIonButtonElement[] => {
    const onFindActivePage = (root: Element): Element => {
      const element = root.querySelector('ion-router-outlet > .ion-page:not(div):not(.ion-page-hidden)');
      if (!element) {
        return root;
      }
      return onFindActivePage(element);
    };

    return Array.from(onFindActivePage(document.body).querySelectorAll('ion-button'));
  };

  const onDisableButtons = (): void => {
    for (const button of buttons) {
      button.disabled = true;
    }
  };

  const onEnableButtons = (value: T): T => {
    for (const button of buttons) {
      button.disabled = false;
    }
    return value;
  };

  const onSubscribe = (): Observable<[T, CallbackError | V]> => {
    onDisableButtons();
    return zip(present(), load().pipe(catchError(onCatch)));
  };

  const onComplete = ([_, result]: [T, CallbackError | V]): Observable<V> => {
    if (result instanceof CallbackError) {
      throw result.error;
    }
    return of(result);
  };

  const onFinalize = (): Promise<T> => {
    return dismiss().then(onEnableButtons);
  };

  const onCatch = (error: Error): Observable<CallbackError> => {
    return of(new CallbackError(error));
  };

  const buttons = onFindButtons();

  return defer(onSubscribe).pipe(switchMap(onComplete)).pipe(finalize(onFinalize));
}

@Injectable({
  providedIn: 'root',
})
export class Gui {
  constructor(
    private action: ActionSheetController,
    private alert: AlertController,
    private loading: LoadingController,
    private modal: ModalController,
    private toast: ToastController,
  ) {
  }

  openActions(options?: ActionSheetOptions): Promise<HTMLIonActionSheetElement> {
    const defaults = {
      header: 'Options',
      buttons: [
        {
          icon: 'share',
          text: 'Share',
          handler: (): void => undefined,
        },
        {
          icon: 'flag',
          text: 'Report',
          handler: (): void => undefined,
        },
        {
          icon: 'close',
          role: 'cancel',
          text: 'Cancel',
          handler: (): void => undefined,
        },
      ],
    };

    return (
      this.action
        .create(Object.assign(defaults, options))
        .then(sheet => sheet.present().then(() => sheet))
    );
  }

  closeActions(): Promise<boolean> {
    return this.action.dismiss();
  }

  openAlert(options?: AlertOptions): Observable<HTMLIonAlertElement> {
    const defaults = {
      title: 'Alert',
      buttons: ['Okay'],
    };

    const onSubscribe = (): Promise<HTMLIonAlertElement> => {
      return (
        this.alert
          .create({ ...defaults, ...options })
          .then(modal => modal.present().then(() => modal))
      );
    };

    return defer(onSubscribe);
  }

  openErrorAlert(error: Error, options?: AlertOptions): Observable<HTMLIonAlertElement> {
    const defaults = {
      header: 'Something went wrong.',
      message: error.message ?? 'Please try again.',
    };

    return this.openAlert({ ...defaults, ...options });
  }

  openLoadAlert<T>(callback: () => Observable<T>, options?: LoadingOptions): Observable<T> {
    const defaults = {
      message: 'Loading...',
    };

    const onCreate = (): Promise<HTMLIonLoadingElement> => {
      return this.loading.create({ ...defaults, ...options });
    };

    const onPresent = (): Promise<HTMLIonLoadingElement> => {
      return instance.then(load => load.present().then(() => load));
    };

    const onDismiss = (): Promise<HTMLIonLoadingElement> => {
      return instance.then(load => load.dismiss().then(() => load));
    };

    const instance = onCreate();

    return createLoad(onPresent, onDismiss, callback);
  }

  openModal(options: ModalOptions): Observable<HTMLIonModalElement> {
    const onSubscribe = (): Promise<HTMLIonModalElement> => {
      return (
        this.modal
          .create(options)
          .then(modal => modal.present().then(() => modal))
      );
    };

    return defer(onSubscribe);
  }

  closeModal(): Observable<boolean> {
    return defer(() => this.modal.dismiss());
  }

  openLoadProgress<T>(callback: () => Observable<T>, options?: Partial<HTMLIonProgressBarElement>): Observable<T> {
    const onCreate = (): HTMLIonProgressBarElement => {
      const element = Object.assign(document.createElement('ion-progress-bar'), { type: 'indeterminate', ...options });
      element.classList.add('app-progress-bar');
      return element;
    };

    const onPresent = (): Promise<HTMLIonProgressBarElement> => {
      const onThen = (): HTMLIonProgressBarElement => {
        document.querySelector('ion-app').appendChild(instance);
        return instance;
      };

      return Promise.resolve().then(onThen);
    };

    const onDismiss = (): Promise<HTMLIonProgressBarElement> => {
      const onThen = (): HTMLIonProgressBarElement => {
        instance.remove();
        return instance;
      };

      return Promise.resolve().then(onThen);
    };

    const instance = onCreate();

    return createLoad(onPresent, onDismiss, callback);
  }

  openManagedLoadProgress<T>(callback: () => Observable<T>, options?: Partial<HTMLIonProgressBarElement>): Observable<T> {
    const onCatch = (error: Error): Observable<never> => {
      const onSwitch = (): never => {
        throw error;
      };

      return this.openErrorToast(error).pipe(switchMap(onSwitch));
    };

    return this.openLoadProgress(callback, options).pipe(catchError(onCatch));
  }

  openToast(options?: ToastOptions): Observable<HTMLIonToastElement> {
    const defaults = {
      header: 'Alert',
      buttons: ['Okay'],
      cssClass: 'app-toast',
      duration: 5 * 1000,
    };

    const onSubscribe = (): Promise<HTMLIonToastElement> => {
      return (
        this.toast
          .create({ ...defaults, ...options })
          .then(modal => modal.present().then(() => modal))
      );
    };

    return defer(onSubscribe);
  }

  openErrorToast(error: Error, options?: ToastOptions): Observable<HTMLIonToastElement> {
    const defaults = {
      header: 'Something went wrong.',
      message: error.message ?? 'Please try again.',
    };

    return this.openToast({ ...defaults, ...options });
  }
}
