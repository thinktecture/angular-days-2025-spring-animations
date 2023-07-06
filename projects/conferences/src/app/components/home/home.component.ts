import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ListItemComponent, SearchBarComponent } from '@sl/components';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, CardComponent, ListItemComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('1s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('cards', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-1rem)' }),
          stagger('400ms', [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ]),
      ]),
    ]),
    trigger('messages', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          stagger('400ms', [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
        ]),
      ]),
    ]),
    trigger('slideOutLeft', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('800ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  private readonly dataService = inject(DataService);

  conferences$ = this.dataService.conferences$;
  messages$ = this.dataService.messages$;

  public deleteMessage(messageId: string): void {
    this.dataService.deleteMessage(messageId);
  }
}
