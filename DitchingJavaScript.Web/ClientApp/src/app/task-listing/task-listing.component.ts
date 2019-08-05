import { Component } from '@angular/core';
import { QuestState } from "../services/questState";

@Component({
  selector: 'task-listing',
  templateUrl: './task-listing.component.html'
})
export class TaskListingComponent {
  constructor(public questState: QuestState) {

  }
}
