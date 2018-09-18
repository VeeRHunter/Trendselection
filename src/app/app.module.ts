import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FooterPage } from '../pages/footer/footer';
import { DetailPage } from '../pages/detail/detail';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechnologyPage } from '../pages/technology/technology';
import { ApiserverProvider } from '../providers/apiserver/apiserver';
import { HttpModule, Http } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FooterPage,
    DetailPage,
    TechnologyPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FooterPage,
    DetailPage,
    TechnologyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiserverProvider
  ]
})
export class AppModule {}
