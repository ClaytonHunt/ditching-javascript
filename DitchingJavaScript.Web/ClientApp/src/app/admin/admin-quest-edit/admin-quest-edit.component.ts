import { Component } from '@angular/core';
import {QuestState } from "../../services/questState";
import { QuestLine } from "../../../models/quest-line";
import { Subscription } from "rxjs";

@Component({
  selector: 'admin-quest-edit',
  templateUrl: './admin-quest-edit.component.html'
})
export class AdminQuestEditComponent {
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

  public createNewQuest() {
    this.questState.selectQuest(new QuestLine());
  }
}
