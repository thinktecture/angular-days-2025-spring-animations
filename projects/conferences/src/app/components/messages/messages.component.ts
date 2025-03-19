import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '@sl/components';
import { DataService } from '../../data.service';

@Component({
    selector: 'app-messages',
    imports: [CommonModule, ListItemComponent],
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  private readonly dataService = inject(DataService);
  messages$ = this.dataService.messages$;

  public deleteMessage(messageId: number): void {
    this.dataService.deleteMessage(messageId);
  }
}
