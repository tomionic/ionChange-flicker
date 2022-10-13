import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'dashboards',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      'android-minSdkVersion': '24',
      'android-targetSdkVersion': '30',
      AndroidXEnabled: 'true',
      AutoHideSplashScreen: 'false',
      BackupWebStorage: 'none',
      FadeSplashScreenDuration: '250',
      GradlePluginKotlinEnabled: 'true',
      ScrollEnabled: 'false',
      ShowSplashScreenSpinner: 'false',
      SplashMaintainAspectRatio: 'true',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000',
      SplashScreenSpinnerColor: '#3880FF',
      SplashShowOnlyFirstTime: 'false',
      StatusBarBackgroundColor: '#FFFFFF',
      StatusBarStyle: 'lightcontent'
    }
  }
};

export default config;
