import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { QuestLine } from "../../models/quest-line";
import { QuestTask } from "../../models/quest-task";

declare var DotNet: any;

@Injectable()
export class QuestState {
  private _questClone: QuestLine;
  private _taskClone: QuestTask;
  private _quests: QuestLine[];

  public onStateChanged: Observable<any> = new Subject();
  public quests: Observable<QuestLine[]> = new BehaviorSubject([]);
  public currentQuest: QuestLine;
  public currentTask: QuestTask;

  constructor(private _http: HttpClient) {
    this.populateQuests();
  }

  public isCurrentQuest(quest: QuestLine): boolean {
    return quest === this.currentQuest;
  }

  public populateQuests(): void {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'GetQuestsAsync')
      .then((response: any[]) => {
        console.log(response);
        this._quests = response.map(i => new QuestLine(i));
        this.updateQuests();
      });
  }

  public selectQuest(quest: QuestLine) {
    this.clearUnsavedQuestChanges();

    this.currentQuest = quest;
    this._questClone = quest.clone();
    this.currentTask = null;
    this._taskClone = null;

    if (this.currentQuest.tasks.length <= 0) {
      DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'SelectQuestAsync', quest)
        .then((response: any[]) => {
          this.currentQuest.tasks = response.map(t => new QuestTask({ ...t, quest: { id: quest.id } }));
        });
    }

    this.stateHasChanged();
  }

  public saveQuest(quest: QuestLine): void {
    const isNew = !quest.id;

    if (isNew) {
      this.createQuest(quest);
    }
    else {
      this.updateQuest(quest);
    }
  }

  public deleteQuest(quest: QuestLine): void {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'DeleteQuestAsync', quest)
      .then(() => {
        if (quest === this.currentQuest) {
          this.currentQuest = null;
          this._questClone = null;
        }

        this._quests = this._quests.filter(x => x !== quest);
        this.updateQuests();

        this.stateHasChanged();
      });
  }

  public updateQuestStatus(quest: QuestLine): void {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'UpdateQuestStatusAsync', quest)
      .then(() => {
        quest.isCompleted = !quest.isPermanent && quest.tasks.every(t => t.isCompleted);
        quest.isBeingWorked = !quest.isCompleted && quest.isBeingWorked;
        this.stateHasChanged();
      });
  }

  public toggleQuest(quest: QuestLine): void {
    try {
      DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'ToggleQuestAsync', quest)
        .then(() => {
          quest.isBeingWorked = !quest.isBeingWorked;
          this.stateHasChanged();
        });
    }
    catch (ex) {
      // quest.isBeingWorked = !quest.isBeingWorked;
    }
  }

  public selectTask(task: QuestTask): void {
    this.clearUnsavedTaskChanges();

    this.currentTask = task;
    this._taskClone = task.clone();

    this.stateHasChanged();
  }

  public toggleTask(task: QuestTask): void {
    try {
      DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'ToggleTaskAsync', task)
        .then(() => {
          task.isCompleted = !task.isCompleted;
          this.updateQuestStatus(this.currentQuest);
        });
    }
    catch (ex) {
      // task.isCompleted = !task.isCompleted;
    }
  }

  public saveTask(task: QuestTask): void {
    const isNew = !task.id;

    if (isNew) {
      this.createTask(task);
    }
    else {
      this.updateTask(task);
    }

    this._taskClone = task.clone();
  }

  public deleteTask(task: QuestTask): void {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'DeleteTaskAsync', task)
      .then(() => {
        if (task === this.currentTask) {
          this.currentTask = null;
          this._taskClone = null;
        }

        this.currentQuest.tasks = this.currentQuest.tasks.filter(x => x !== task);
      });
  }

  public isCurrentTask(task: QuestTask): boolean {
    return task === this.currentTask;
  }

  public updateQuests() {
    (this.quests as Subject<QuestLine[]>).next(this._quests);
  }

  private createQuest(quest: QuestLine) {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'CreateQuestAsync', quest)
      .then((id: number) => {
        quest.id = id;

        this._questClone = quest;

        this._quests.push(quest);
        this.updateQuests();
      });
  }

  private updateQuest(quest: QuestLine) {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'UpdateQuestAsync', quest)
      .then(() => {
      this._questClone = null;
    });
  }

  private createTask(task: QuestTask) {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'CreateTaskAsync', task)
      .then((id: number) => {
      task.id = id;

      this.currentQuest.tasks.push(task);
    });
  }

  private updateTask(task: QuestTask): void {
    DotNet.invokeMethodAsync('DitchingJavaScript.Web', 'UpdateTaskAsync', task)
      .then(() => {
      this._taskClone = null;
    });
  }

  private clearUnsavedQuestChanges(): void {
    if (this._questClone != null) {
      this.currentQuest.name = this._questClone.name;
      this.currentQuest.description = this._questClone.description;
    }
  }

  private clearUnsavedTaskChanges(): void {
    if (this._taskClone != null) {
      this.currentTask.name = this._taskClone.name;
    }
  }

  private stateHasChanged(): void {
    (this.onStateChanged as Subject<any>).next(null);
  }
}
