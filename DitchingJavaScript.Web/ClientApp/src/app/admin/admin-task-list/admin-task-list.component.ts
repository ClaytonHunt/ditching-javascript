import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestState } from "../../services/questState";
import { QuestTask } from '../../../models/quest-task';

@
  Component({
    selector: 'admin-task-list',
    templateUrl: './admin-task-list.component.html'
  })
export class AdminTaskListComponent implements OnInit {
  constructor(public questState: QuestState) { }

  public ngOnInit()
  {
    this.questState.onStateChanged.subscribe(() => {
      this.questState.updateQuests();
    });
  }

  public createNewTask() {
    this.questState.selectTask(new QuestTask());
  }
}
