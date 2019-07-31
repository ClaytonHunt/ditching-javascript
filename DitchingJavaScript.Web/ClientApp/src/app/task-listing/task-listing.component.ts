import { Component, Input } from '@angular/core';
import { QuestLine } from "../../models/quest-line";
import { QuestState } from "../services/questState";

@Component({
  selector: 'task-listing',
  templateUrl: './task-listing.component.html'
})
export class TaskListingComponent {
  @Input() quest: QuestLine = null;

  constructor(public questState: QuestState) {

  }
}
