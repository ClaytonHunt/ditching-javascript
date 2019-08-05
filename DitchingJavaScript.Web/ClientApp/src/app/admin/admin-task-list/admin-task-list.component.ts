import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestState } from "../../services/questState";
import { QuestTask } from '../../../models/quest-task';
import { Subscription } from "rxjs";

@Component({
    selector: 'admin-task-list',
    templateUrl: './admin-task-list.component.html'
  })
export class AdminTaskListComponent implements OnInit, OnDestroy {
  private stateChanged: Subscription = null;

  constructor(public questState: QuestState) { }

  public ngOnInit()
  {
    this.questState.onStateChanged.subscribe(() => {
      this.questState.updateQuests();
    });

    this.stateChanged = this.questState.onStateChanged.subscribe(state => {
      this.questState.updateQuests();
    });
  }

  public async ngOnDestroy() {
    this.stateChanged.unsubscribe();
  }

  public createNewTask() {
    this.questState.selectTask(new QuestTask());
  }
}
