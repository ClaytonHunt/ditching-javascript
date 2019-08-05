import { Component } from '@angular/core';
import { QuestState } from '../../services/questState';
import { Subscription } from "rxjs";

@
  Component({
    selector: 'admin-task-edit',
    templateUrl: './admin-task-edit.component.html'
  })
export class AdminTaskEditComponent {
  constructor(public questState: QuestState) { }

  private stateChanged: Subscription = null;
  public async ngOnInit() {
    this.stateChanged = this.questState.onStateChanged.subscribe(state => {
      this.questState.updateQuests();
    });
  }

  public async ngOnDestroy() {
    this.stateChanged.unsubscribe();
  }
}
