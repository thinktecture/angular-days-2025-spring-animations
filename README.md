# Mit Animationen zum Wow-Effekt: Strategien und Best Practices für ansprechende Angular-Apps (Hands-on)

[Angular Days 2024](https://javascript-days.de/angular/mit-animationen-zum-wow-effekt-strategien-und-best-practices-ansprechende-angular-apps-hands-on/), 22. Oktober 2024, 9:00–12:30

Trainer: Sascha Lehmann ([@derLehmann_S](https://twitter.com/derLehmann_S)) ([@Thinktecture](https://www.thinktecture.com/thinktects/sascha-lehmann/))

---

Animationen gehören neben einem ansprechenden Design zu den wichtigsten Erfolgsfaktoren einer gelungenen User Experience. Der Trend geht hin zu immer mehr Animationen, sodass das Wissen um die Basistechnologien immer mehr an Bedeutung gewinnt.

In diesem Workshop zeigt Ihnen Sascha Lehmann von Thinktecture, wie Sie Ihre Angular-Projekte effektiv auf Animationsanforderungen vorbereiten und wie Sie Hilfe von CSS- und Angular-Animations komplexe Animations-Orchestrierungen vornehmen können. Außerdem werfen wir mit der View Transition API einen Blick in die Zukunft der Webanimationen. Damit verleihen Sie Ihrer Angular-App den letzten Schliff!

## Installationsanweisungen

Sie können mitentwickeln: Bitte bringen Sie dazu Ihr Notebook mit installiertem [Google Chrome](https://www.google.com/chrome/) ([Canary](https://www.google.com/chrome/canary/)), [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) und [WebStorm](https://www.jetbrains.com/webstorm/) oder [Visual Studio Code](https://code.visualstudio.com/) mit.

Es ist ein uneingeschränkter Internetzugriff erforderlich (ohne Gruppenrichtlinien, Unternehmensproxys und -firewalls), bitte im Zweifel das Privatnotebook einpacken.

Nach dem Klonen des Repositorys führen Sie bitte folgende Kommandos auf der Kommandozeile aus:

```sh
npm i
npm start
```

---

**NOTE**

Wenn Sie auf dem Branch **view-transitions** wechseln müssen Sie anschließend einen forcierten Install vornehmen, da dort mit der Preview Version von Angular gearbeitet wird und es deshalb zu Problemen mit Peer-Dependencies kommen kann.

```sh
npm i --force
```

---

Das Projekt beruht auf er [Angular CLI](https://github.com/angular/angular-cli) Version 18.2.5.

## Hands-on Lab

### 1. CSS Animationen

Checke zunächst den Branch **css-animations** aus um darauf die Übung auszuführen.

<details><summary> 1. Aufgabe Navigation-Dawer</summary>

Implementiere eine CSS Animation, sodass der **Navigation-Drawer** beim Laden der App von links nach rechts in die View "slided".

</details>

<details><summary>Lösung 1. Aufgabe</summary>

```css
:host {
  // ...
  animation: slideInFromLeft 400ms both ease-out;
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
}
```

</details>

<details><summary>2. Aufgabe</summary>
Implementiere für die **Home-Component** folgende CSS Animation:
    1. Die Conference-Cards sowie die Messages werden **gemeinsam** in die View animiert (Art und Weise sind deiner Kreativität überlassen ;-) )
    2. Anschließend wird die Search-Bar verzögert in die View animiert.
    3. Zusatz: Die beiden Animationen sollen erst starten, **nachdem** die Animation des **Navigation-Drawer** abgeschlossen ist
</details>

<details><summary>Lösung 2. Aufgabe</summary>

```css
@mixin fade {
  animation-name: fadeIn;
  animation-duration: 400ms;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-delay: 500ms;
}

sl-search-bar {
  // ...
  animation-name: slideInFromTop;
  animation-duration: 350ms;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-delay: calc(400ms + 500ms); // Dely Drawer Animation + Conference & Messages Animation
}

.conferences-container {
  // ...
  @include fade;
}

.messages-container {
  // ...
  @include fade;
}

@keyframes slideInFromTop {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
}
```

</details>

<details><summary>3. Aufgabe</summary>

Implementiere für die **Conferences-Component** folgende Animationen: 1. Animiere die Liste der Conference-Cards gemeinsam in die View. (Du kannst gerne kreativ werden) 2. In der Component befindet sich auch ein **Conference-Info-Drawer** der erscheint, wenn auf eine Card geklickt wird. Animiere diesen so, dass er beim Erscheinen von **rechts** in die View slidet. 3. Zusatz: Kannst du ihn auch wieder heraussliden lassen?

</details>

<details><summary>Lösung 3. Aufgabe</summary>

**conference-info-drawer.component.scss**

```css
:host {
  // ...
  animation-name: slideInFromRight;
  animation-duration: 800ms;
  animation-timing-function: ease-in-out;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
}
```

**conferences.component.scss**

```css
.cards {
  //...
  animation-name: fadeInFromBottom;
  animation-duration: 400ms;
  animation-fill-mode: both;
}

@keyframes fadeInFromBottom {
  from {
    opacity: 0.6;
    transform: translateY(1rem);
  }
}
```

</details>

<details><summary>4. Aufgabe (Zusatz)</summary>
Implementiere für die **Messages-Component** eine "staggering" Animation. D.h. dass alle List-Items nacheinander, mit einem leichten Delay in die View animiert werden.
</details>

<details><summary>Lösung 4. Aufgabe</summary>

```html
<div class="messages">
  <sl-list-item
    *ngFor="let message of messages$ | async; index as i"
    [style.--message-index]="i+1"
    [model]="message"
    (close)="deleteMessage($event)"
    class="message"
  ></sl-list-item>
</div>
```

```css
.messages {
  //...
  .message {
    animation: fallIn 350ms both ease-in-out;
    animation-delay: calc(var(--message-index) * 100ms);
  }
}

@keyframes fallIn {
  from {
    opacity: 0;
    transform: scale(0.6) translateY(-0.5rem);
  }
}
```

</details>

---

**Gesamtlösung:**
Wenn du dir meine beispielhafte Gesamtlösung anschauen möchtst kannst du dir den Branch **css-animations-solution** auschecken.

---

### 2. Angular Animations

Checke zunächst den Branch **angular-animations** aus um darauf die Übung auszuführen.

<details><summary>1. Aufgabe </summary>

Implementiere Slide-In und Slide-Out Angular-Animations für den **Navigation-Drawer** und den **Conference-Info-Drawer**.

Zusatz: Überlege wie könnte man den Animationscode wiederverwendbarer gestalten?

</details>

<details><summary>Lösung 1. Aufgabe</summary>

**navigation-drawer.component.ts**

```ts
@Component({
  // ...
  animations: [slideInOutAnimationFactory('X', '-100%', '0')],
})
export class NavigationDrawerComponent {
  @HostBinding('@slideInOut')
  private slideInOut = true;
}
```

**conference-info-drawer.component.ts**

```ts
@Component({
  // .....
  animations: [slideInOutAnimationFactory('X', '100%', '0')],
})
export class ConferenceInfoDrawerComponent implements OnInit, OnChanges {
  // ....

  @HostBinding('@slideInOut')
  private slideInOut = true;

  // ...
}
```

**slide.animation.ts**

````ts

export const slideInOutAnimationFactory = (
  direction: AnimationDirection,
  from: string,
  to: string,
  duration: string = getCSSPropertyValue('--md-sys-motion-duration-medium-3'),
  easing: string = getCSSPropertyValue('--md-sys-motion-easing-emphasized'),
): AnimationTriggerMetadata =>
  trigger('slideInOut', [
    transition(':enter', [
      style({
        opacity: 0.8,
        transform: `translate${direction}(${from})`,
      }),
      animate(
        `${duration} ${easing}`,
        style({
          opacity: 1,
          transform: `translate${direction}(${to})`,
        }),
      ),
    ]),
    transition(':leave', [
      style({
        transform: `translate${direction}(${to})`,
      }),
      animate(
        `${getCSSPropertyValue('--md-sys-motion-duration-short-3')} ${easing}`,
        style({
          opacity: 0.6,
          transform: `translate${direction}(${from})`,
        }),
      ),
    ]),
  ]);


    ```

</details>

<details><summary>2. Aufgabe</summary>

1. Implementiere die "staggering" Animation der **Messages-Component** aus der CSS-Animation-Aufabe nun mit Hilfe von Angular-Animations
2. Implementiere eine "delete" Animation, bei der das gelöschte List-Item nach links aus der View gleitet.

</details>

<details><summary>Lösung 2. Aufgabe</summary>

**messages.component.html**

```html

<div @listContainer class="messages">
  <sl-list-item
    @listItem
    *ngFor="let message of messages$ | async"
    [model]="message"
    (close)="deleteMessage($event)"
  ></sl-list-item>
</div>

````

**messages.component.ts**

```ts
@Component({
  //...
  animations: [ListContainer, ListItem],
})
export class MessagesComponent {
  // ...
}
```

**list.animation.ts**

```ts
export const ListItem = trigger('listItem', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-1.5rem)', scale: 0.8 }),
    animate(
      `${getCSSPropertyValue('--md-sys-motion-duration-medium-3')} ${getCSSPropertyValue(
        '--md-sys-motion-easing-decelerating',
      )}`,
      style({ opacity: 1, transform: 'translateY(0)', scale: 1 }),
    ),
  ]),
  transition(':leave', [
    sequence([
      animate(
        `${getCSSPropertyValue('--md-sys-motion-duration-short-3')} ${getCSSPropertyValue(
          '--md-sys-motion-easing-accelerating',
        )}`,
        style({
          transform: `translateX(-200%)`,
        }),
      ),
      animate(
        `${getCSSPropertyValue('--md-sys-motion-duration-short-3')} ease`,
        style({
          height: 0,
        }),
      ),
    ]),
  ]),
]);

export const ListContainer = trigger('listContainer', [
  transition(':enter, :leave', [
    query('@*', [
      stagger(getCSSPropertyValue('--md-sys-motion-duration-stagger-delay'), [animateChild()]),
    ]),
  ]),
]);
```

</details>

<details><summary>3. Aufgabe</summary>
1. Implementiere generelle Routing-Animationen
2. Zusatz: Sorge dafür, dass beim Navigieren auf die **Messages-Component** die zuvor implementierte List-Animation wieder/immernoch funktioniert

</details>

<details><summary>Lösung 3. Aufgabe</summary>

**app.component.html**

```html
<sl-navigation-drawer *slScreenMediumAndLarge></sl-navigation-drawer>
<main [@routerAnimation]="prepareRoute(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
</main>
<sl-bottom-bar *slScreenXSmallAndSmall></sl-bottom-bar>
```

**app.component.ts**

```ts
@Component({
  // ...
  animations: [RouterAnimations],
})
export class AppComponent {
  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
```

**app.routes.ts**

```ts
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'messages', loadChildren: () => import('./components/messages/message.routes') },
  { path: 'conferences', loadChildren: () => import('./components/conferences/conference.routes') },
];
```

**conference.routes.ts**

```ts
const conferenceRoutes: Routes = [
  { path: '', component: ConferencesComponent, data: { animation: 'conferences' } },
  { path: ':id', component: ConferenceDetailComponent, data: { animation: 'detail' } },
];
```

**messages.routes.ts**

```ts
const messageRoutes: Routes = [
  { path: '', component: MessagesComponent, data: { animation: 'messages' } },
  { path: ':id', component: MessageDetailComponent, data: { animation: 'detail' } },
];
```

**router.animation.ts**

```ts
const routeReset = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        width: 'calc(100% - 7rem)',
        marginLeft: '7rem',
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: 0,
      }),
    ],
    { optional: true },
  ),
];

const defaultLeave = [
  style({ opacity: 1 }),
  animate(
    getCSSPropertyValue('--md-sys-motion-duration-short-3'),
    style({ opacity: 0, transform: 'translateY(1rem)' }),
  ),
];

const defaultEnter = [
  style({ opacity: 0, transform: 'translateY(1rem)' }),
  animate(
    getCSSPropertyValue('--md-sys-motion-duration-medium-3'),
    style({ opacity: 1, transform: 'translateY(0)' }),
  ),
];

export const RouterAnimations: AnimationTriggerMetadata = trigger('routerAnimation', [
  transition('* => messages, messages => *', [
    ...routeReset,
    group([
      query(':leave', [...defaultLeave], {
        optional: true,
      }),
      query(
        ':enter',
        [...defaultEnter, query('@listContainer', [animateChild()], { optional: true })],
        {
          optional: true,
        },
      ),
    ]),
  ]),
  transition('* => *', [
    ...routeReset,
    group([
      query(':leave', [...defaultLeave], { optional: true }),
      query(':enter', [...defaultEnter], { optional: true }),
    ]),
  ]),
]);
```

</details>

---

**Gesamtlösung:**
Wenn du dir meine beispielhafte Gesamtlösung anschauen möchtst kannst du dir den Branch **angular-animations-solution** auschecken.

---

### 3. View Transition API

Dieser Übungsteil dient dazu, dass ihr ein euch ein bisschen mit der View-Transition-API vertraut machen und experimentiern könnt.
Deshalb gibt es auch keine konkrete Aufgabe die es zu lösen gibt. Seid etwas kreativ und versucht einmal verschiedene Bestanddteile und Übergänge zu animieren.
