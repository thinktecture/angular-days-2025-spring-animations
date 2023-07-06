import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, Conference, ConferenceInfoDrawerComponent } from '@sl/components';
import { DataService } from '../../data.service';
import { BehaviorSubject } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule, CardComponent, ConferenceInfoDrawerComponent],
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cards', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, scale: 0 }),
          stagger('200ms', [animate('900ms ease-out', style({ opacity: 1, scale: 1 }))]),
        ]),
      ]),
    ]),
    trigger('drawerSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('450ms ease-in', style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class ConferencesComponent {
  private readonly dataService = inject(DataService);

  selectedConference$ = new BehaviorSubject<Conference | undefined>(undefined);
  conferences$ = this.dataService.conferences$;
}
