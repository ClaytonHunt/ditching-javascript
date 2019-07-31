import { Component, Input } from "@angular/core";
import { QuestLine } from "../../models/quest-line";
import { QuestState } from "../services/questState";

@Component({
  selector: 'quest-listing',
  templateUrl: './quest-listing.component.html'
})
export class QuestListingComponent {
  @Input() public quests: Array<QuestLine> = [];

  constructor(public questState: QuestState) {

  }
}
