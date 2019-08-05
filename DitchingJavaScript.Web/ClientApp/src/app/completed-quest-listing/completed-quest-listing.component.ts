import { Component } from "@angular/core";
import { QuestLine } from "../../models/quest-line";
import { QuestState } from "../services/questState";

@Component({
  selector: 'completed-quest-listing',
  templateUrl: './completed-quest-listing.component.html'
})
export class CompletedQuestListingComponent {
  public quests: Array<QuestLine> = [];

  constructor(public questState: QuestState) {
    questState.quests.subscribe(q => {
      this.quests = q.filter(x => x.isCompleted);
    });
  }
}
