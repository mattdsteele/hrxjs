import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeartRateDisplayComponent } from './heart-rate-display/heart-rate-display.component';
import {
  RealHeartRateService,
  HeartRateService,
  FakeHeartRateService
} from './heart-rate.service';

@NgModule({
  declarations: [AppComponent, HeartRateDisplayComponent],
  imports: [BrowserModule],
  providers: [{ provide: HeartRateService, useClass: FakeHeartRateService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
