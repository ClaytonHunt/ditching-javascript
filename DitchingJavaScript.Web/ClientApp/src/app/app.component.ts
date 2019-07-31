import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { QuestsComponent } from './quests/quests.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(injector: Injector) {
    // Convert Components to Elements
    const questsElement = createCustomElement(QuestsComponent, { injector });

    // Register the custom elements with the browser
    customElements.define('quests-element', questsElement);
  }
}
