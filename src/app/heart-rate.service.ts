import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeartRateService {
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
      map(dv => dv.getUint8(1))
    );
  }
}
