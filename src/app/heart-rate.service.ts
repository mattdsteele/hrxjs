import { Injectable } from '@angular/core';
import {
  fromEvent,
  Observable,
  interval,
  BehaviorSubject,
  Subject
} from 'rxjs';
import { map, throttleTime, startWith } from 'rxjs/operators';

export abstract class HeartRateService {
  abstract connect(): Promise<Observable<number>>;
}
@Injectable({
  providedIn: 'root'
})
export class FakeHeartRateService implements HeartRateService {
  async connect(): Promise<Observable<number>> {
    const subject = new BehaviorSubject<number>(100);
    const hr$ = interval(5000).pipe(
      map(() => {
        return Math.floor(60 + Math.random() * 90);
      })
    );
    hr$.subscribe(subject);
    return subject;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RealHeartRateService implements HeartRateService {
  constructor() {}
  async connect(): Promise<Observable<number>> {
    const device = await (navigator as any).bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }]
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('heart_rate');
    const characteristic = await service.getCharacteristic(
      'heart_rate_measurement'
    );
    await characteristic.startNotifications();
    return fromEvent(characteristic, 'characteristicvaluechanged').pipe(
      map((e: any) => e.target.value as DataView),
      map(dv => dv.getUint8(1)),
      throttleTime(1000)
    );
  }
}
