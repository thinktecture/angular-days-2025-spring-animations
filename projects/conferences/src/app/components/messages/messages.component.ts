import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '@sl/components';
import { DataService } from '../../data.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('messages', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(100%)' }),
          stagger('400ms', [
            animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
        ]),
      ]),
    ]),
    trigger('slideOutRight', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class MessagesComponent {
  private readonly dataService = inject(DataService);
  messages$ = this.dataService.messages$;

  public deleteMessage(messageId: string): void {
    this.dataService.deleteMessage(messageId);
  }
}
