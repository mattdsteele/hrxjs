import { Component, OnInit } from '@angular/core';
import { HeartRateService } from '../heart-rate.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-heart-rate-display',
  templateUrl: './heart-rate-display.component.html',
  styleUrls: ['./heart-rate-display.component.css']
})
export class HeartRateDisplayComponent implements OnInit {
  heartRate$: Observable<number>;
  constructor(private heartRate: HeartRateService) {}

  ngOnInit() {}
  async connect() {
    this.heartRate$ = await this.heartRate.connect();
  }
}
