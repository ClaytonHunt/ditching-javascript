import { Component } from "@angular/core";
import { QuestLine } from "../../models/quest-line";
import { QuestState } from "../services/questState";

@Component({
  selector: 'active-quest-listing',
  templateUrl: './active-quest-listing.component.html'
})
export class ActiveQuestListingComponent {
  public quests: Array<QuestLine> = [];

  constructor(public questState: QuestState) {
    this.questState.quests.subscribe(q => {
      this.quests = q.filter(x => !x.isCompleted).reverse();
    });
  }
}
