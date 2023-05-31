import { Injectable } from '@angular/core';
import { Conference, Message } from '@sl/components';
import { BehaviorSubject, Observable, of } from 'rxjs';

const MESSAGES_DATA: Message[] = [
  { id: '11', author: 'So Duri', shorthand: 'SD' },
  { id: '12', author: 'Dim Sum', shorthand: 'DS' },
  { id: '13', author: 'Lorem Ipsum', shorthand: 'LI' },
  { id: '14', author: 'Max Mustermann', shorthand: 'MM' },
  { id: '15', author: 'Sandra Müller', shorthand: 'SM' },
  { id: '17', author: 'Michael Gonzales', shorthand: 'MG' },
];

const CONFERENCES_DATA: Conference[] = [
  {
    id: '1',
    title: 'BASTA!',
    imageUrl: 'https://basta.net/wp-content/uploads/2023/02/BASTA_MZ23_OpenGraph_v1b.png',
    description:
      'Bacon ipsum dolor amet leberkas frankfurter landjaeger, beef hamburger doner pastrami sausage ham hock tri-tip buffalo corned beef cow. Bresaola doner salami buffalo.',
  },
  {
    id: '2',
    title: 'Angular Days',
    imageUrl:
      'https://javascript-days.de/wp-content/uploads/2022/01/JSD_MUC21_Kombibanner_FB_1200x600_63404_v1.jpg',
    description:
      'Hamburger beef corned beef meatball, pork loin salami tongue shank biltong filet mignon landjaeger cupim spare ribs kielbasa cow. Bacon drumstick pig chislic tail. Tenderloin corned beef meatball salami, rump burgdoggen buffalo turducken pork loin capicola biltong beef ribs jowl tongue beef.',
  },
  {
    id: '3',
    title: 'DWX',
    imageUrl: 'https://www.developer-week.de/app/uploads/2022/07/DWX23_1500x500-Twitter.jpg',
    description:
      'Shankle jowl jerky, pork chop hamburger ham brisket pork alcatra ribeye landjaeger doner spare ribs frankfurter sausage. Shoulder andouille ham hock pancetta.',
  },
  {
    id: '4',
    title: 'MD Dev-Days',
    imageUrl: 'https://md-devdays.de/assets/Banner_LandingPage.jpg',
    description:
      'Filet mignon kielbasa venison chislic, bacon doner capicola drumstick beef short ribs pastrami burgdoggen. Pancetta ham swine filet mignon.',
  },
  {
    id: '5',
    title: 'iJS',
    imageUrl:
      'https://javascript-conference.com/wp-content/uploads/2020/02/IJS_20_Website_OpenGraph_1200x630_56631_v2.jpg',
    description:
      'Turducken shoulder pork chop, filet mignon buffalo kevin shankle fatback. Pork beef kielbasa jowl meatloaf ham pork loin corned beef spare ribs bacon prosciutto bresaola andouille chuck t-bone. Jerky cupim bacon drumstick capicola tongue cow short ribs prosciutto.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messages = MESSAGES_DATA;
  conferences$: Observable<Conference[]> = of(CONFERENCES_DATA);
  messages$$ = new BehaviorSubject<Message[]>(this.messages);
  messages$ = this.messages$$.asObservable();

  public getMessage(messageId: string): Observable<Message> {
    return of(MESSAGES_DATA.filter(({ id }) => id === messageId)?.[0]);
  }

  public deleteMessage(messageId: string): void {
    this.messages = this.messages.filter(({ id }) => id !== messageId);

    this.messages$$.next(this.messages);
  }

  public getConference(conferenceId: string): Observable<Conference> {
    return of(CONFERENCES_DATA.filter(({ id }) => id === conferenceId)?.[0]);
  }
}
