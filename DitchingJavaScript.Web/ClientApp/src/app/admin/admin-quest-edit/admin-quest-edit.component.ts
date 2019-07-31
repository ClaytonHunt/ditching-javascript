import { Component } from '@angular/core';
import {QuestState } from "../../services/questState";

@Component({
  selector: 'admin-quest-edit',
  templateUrl: './admin-quest-edit.component.html'
})
export class AdminQuestEditComponent {
  constructor(public questState: QuestState) {

  }
}
