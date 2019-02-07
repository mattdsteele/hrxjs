import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeartRateDisplayComponent } from './heart-rate-display/heart-rate-display.component';

@NgModule({
  declarations: [AppComponent, HeartRateDisplayComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
