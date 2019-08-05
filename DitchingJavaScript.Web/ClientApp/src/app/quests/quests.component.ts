import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from "rxjs";
import {QuestLine  } from "../../models/quest-line";
import {QuestState } from "../services/questState";

@Component({
    selector: 'quests',
    templateUrl: './quests.component.html'
  })
export class QuestsComponent {
//  private stateChanged: Subscription = null;
//  public activeQuests: Array<QuestLine> = [];
//  public completedQuests: Array<QuestLine> = [];
//  
//  constructor(public questState: QuestState) {
//    this.questState.quests.subscribe(quests => {
//      this.activeQuests = quests.filter(q => !q.isCompleted).reverse();
//      this.completedQuests = quests.filter(q => q.isCompleted);
//    });
//  }
//
//  public async ngOnInit() {
//    this.stateChanged = this.questState.onStateChanged.subscribe(state => {
//      this.questState.updateQuests();
//    });
//  }
//
//  public async ngOnDestroy() {
//    this.stateChanged.unsubscribe();
//  }
}
