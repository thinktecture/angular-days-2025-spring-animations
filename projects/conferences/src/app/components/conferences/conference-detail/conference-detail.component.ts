import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Conference } from '@sl/components';
import { DataService } from '../../../data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
    selector: 'app-conferences',
    imports: [CommonModule, RouterLink, MatIconModule, MatRippleModule],
    templateUrl: './conference-detail.component.html',
    styleUrls: ['./conference-detail.component.scss']
})
export class ConferenceDetailComponent {
  private readonly dataService = inject(DataService);

  conference$?: Observable<Conference>;

  //Möglich seit Angular 16 --> Router-Config -> withComponentInputBinding()
  @Input()
  set id(conferenceId: string) {
    this.conference$ = this.dataService.getConference(Number(conferenceId));
  }
}
