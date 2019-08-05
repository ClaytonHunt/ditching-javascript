import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ActiveQuestListingComponent } from "./active-quest-listing/active-quest-listing.component";
import { CompletedQuestListingComponent } from "./completed-quest-listing/completed-quest-listing.component";
import { TaskListingComponent } from "./task-listing/task-listing.component";
import { QuestState } from "./services/questState";
import { QuestsComponent } from "./quests/quests.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminQuestListComponent } from "./admin/admin-quest-list/admin-quest-list.component";
import { AdminQuestEditComponent } from "./admin/admin-quest-edit/admin-quest-edit.component";
import { AdminTaskListComponent } from "./admin/admin-task-list/admin-task-list.component";
import { AdminTaskEditComponent } from "./admin/admin-task-edit/admin-task-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    QuestsComponent,
    AdminComponent,
    ActiveQuestListingComponent,
    CompletedQuestListingComponent,
    TaskListingComponent,
    AdminQuestListComponent,
    AdminQuestEditComponent,
    AdminTaskListComponent,
    AdminTaskEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: QuestsComponent, pathMatch: 'full' },
      { path: 'admin', component: AdminComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    QuestState
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    QuestsComponent,
    AdminComponent,
    ActiveQuestListingComponent,
    CompletedQuestListingComponent,
    TaskListingComponent,
    AdminQuestListComponent,
    AdminQuestEditComponent,
    AdminTaskListComponent,
    AdminTaskEditComponent
  ]
})
export class AppModule { }
