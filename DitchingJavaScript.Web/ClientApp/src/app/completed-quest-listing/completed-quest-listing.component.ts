import { Component } from "@angular/core";
import { QuestLine } from "../../models/quest-line";
import { QuestState } from "../services/questState";
import { Subscription } from "rxjs";

@Component({
  selector: 'completed-quest-listing',
  templateUrl: './completed-quest-listing.component.html'
})
export class CompletedQuestListingComponent {
  private stateChanged: Subscription = null;
  public quests: Array<QuestLine> = [];

  constructor(public questState: QuestState) {
    questState.quests.subscribe(q => {
      this.quests = q.filter(x => x.isCompleted);
    });
  }

  public async ngOnInit() {
    this.stateChanged = this.questState.onStateChanged.subscribe(state => {
      this.questState.updateQuests();
    });
  }

  public async ngOnDestroy() {
    this.stateChanged.unsubscribe();
  }
}
