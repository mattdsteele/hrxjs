import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { HeartRateService } from '../heart-rate.service';

@Component({
  selector: 'app-heart-rate-display',
  templateUrl: './heart-rate-display.component.html',
  styleUrls: ['./heart-rate-display.component.css']
})
export class HeartRateDisplayComponent implements OnInit {
  heartRate$: Observable<number>;
  beats$: Observable<string>;
  constructor(private heartRate: HeartRateService) {}

  ngOnInit() {}
  async connect() {
    this.heartRate$ = await this.heartRate.connect();
    this.beats$ = this.heartRate$.pipe(
      tap(e => console.log('hr', e)),
      switchMap(hr => {
        const periodicity = Math.round((1 / (hr / 60)) * 1000);
        return interval(periodicity);
      }),
      tap(() => console.log('beat')),
      switchMap(() => interval(200).pipe(take(2))),
      map(beatVal => (beatVal / 2 === 0 ? 'on' : 'off')),
      tap(b => console.log(`beat map ${b}`))
    );
  }
}
