import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { QuestsComponent } from './quests/quests.component';
import { AdminTaskEditComponent } from "./admin/admin-task-edit/admin-task-edit.component";
import { AdminComponent  } from "./admin/admin.component";
import { ActiveQuestListingComponent  } from "./active-quest-listing/active-quest-listing.component";
import { CompletedQuestListingComponent  } from "./completed-quest-listing/completed-quest-listing.component";
import { TaskListingComponent  } from "./task-listing/task-listing.component";
import { AdminQuestListComponent } from "./admin/admin-quest-list/admin-quest-list.component";
import { AdminQuestEditComponent  } from "./admin/admin-quest-edit/admin-quest-edit.component";
import { AdminTaskListComponent  } from "./admin/admin-task-list/admin-task-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(injector: Injector) {
    // Convert Components to Elements
    const questsElement = createCustomElement(QuestsComponent, { injector });
    const adminElement = createCustomElement(AdminComponent, { injector });
    const activeQuestListingElement = createCustomElement(ActiveQuestListingComponent, { injector });
    const completedQuestListingElement = createCustomElement(CompletedQuestListingComponent, { injector });
    const taskListingElement = createCustomElement(TaskListingComponent, { injector });
    const adminQuestListElement = createCustomElement(AdminQuestListComponent, { injector });
    const adminQuestEditElement = createCustomElement(AdminQuestEditComponent, { injector });
    const adminTaskListElement = createCustomElement(AdminTaskListComponent, { injector });
    const adminTaskEditElement = createCustomElement(AdminTaskEditComponent, { injector });

    // Register the custom elements with the browser
    customElements.define('quests-element', questsElement);
    customElements.define('admin-element', adminElement);
    customElements.define('active-quest-listing-element', activeQuestListingElement);
    customElements.define('completed-quest-listing-element', completedQuestListingElement);
    customElements.define('task-listing-element', taskListingElement);
    customElements.define('admin-quest-list-element', adminQuestListElement);
    customElements.define('admin-quest-edit-element', adminQuestEditElement);
    customElements.define('admin-task-list-element', adminTaskListElement);
    customElements.define('admin-task-edit-element', adminTaskEditElement);
  }
}
