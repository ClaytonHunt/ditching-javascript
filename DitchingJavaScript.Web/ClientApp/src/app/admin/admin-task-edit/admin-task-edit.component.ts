import { Component } from '@angular/core';
import { QuestState } from '../../services/questState';

@
  Component({
    selector: 'admin-task-edit',
    templateUrl: './admin-task-edit.component.html'
  })
export class AdminTaskEditComponent {
  constructor(public questState: QuestState) { }
}
