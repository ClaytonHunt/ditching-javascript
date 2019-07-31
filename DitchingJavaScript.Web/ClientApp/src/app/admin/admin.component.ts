import { Component } from '@angular/core';
import { QuestState } from "../services/questState";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  constructor(public questState: QuestState) {

  }
}
