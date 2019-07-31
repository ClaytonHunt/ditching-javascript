import { Component } from '@angular/core';
import { QuestState } from "../../services/questState";
import { QuestLine } from "../../../models/quest-line";

@Component({
  selector: 'admin-quest-list',
  templateUrl: './admin-quest-list.component.html'
})
export class AdminQuestListComponent {
  constructor(public questState: QuestState) {

  }

  public createNewQuest() {
    this.questState.selectQuest(new QuestLine());
  }
}
