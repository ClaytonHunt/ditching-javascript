import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { QuestLine } from "../../models/quest-line";
import { QuestTask } from "../../models/quest-task";

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
    this._http.get("/quests").subscribe((response: any[]) => {
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
      this._http.get(`/quests/${quest.id}/tasks`).subscribe((response: any[]) => {
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
    this._http.delete(`/quests/${quest.id}`).subscribe(() => {
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
    quest.isCompleted = !quest.isPermanent && quest.tasks.every(t => t.isCompleted);
    quest.isBeingWorked = !quest.isCompleted && quest.isBeingWorked;

    this._http.put(`/quests/${quest.id}`, quest).subscribe(() => {
      this.stateHasChanged();
    });
  }

  public toggleQuest(quest: QuestLine): void {
    quest.isBeingWorked = !quest.isBeingWorked;

    try {
      this._http.put(`/quests/${quest.id}`, quest).subscribe(() => {
        this.stateHasChanged();
      });
    }
    catch (ex) {
      quest.isBeingWorked = !quest.isBeingWorked;
    }
  }

  public selectTask(task: QuestTask): void {
    this.clearUnsavedTaskChanges();

    this.currentTask = task;
    this._taskClone = task.clone();

    this.stateHasChanged();
  }

  public toggleTask(task: QuestTask): void {
    task.isCompleted = !task.isCompleted;

    try {
      this._http.put(`/quests/${this.currentQuest.id}/tasks/${task.id}`, task).subscribe(() => {
        this.updateQuestStatus(this.currentQuest);
      });
    }
    catch (ex) {
      task.isCompleted = !task.isCompleted;
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
    this._http.delete(`/quests/${this.currentQuest.id}/tasks/${task.id}`).subscribe(() => {
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
    this._http.post("/quests", quest).subscribe((id: number) => {
      quest.id = id;

      this._questClone = quest;

      this._quests.push(quest);
      this.updateQuests();
    });
  }

  private updateQuest(quest: QuestLine) {
    this._http.put(`/quests/${quest.id}`, quest).subscribe(() => {
      this._questClone = null;
    });
  }

  private createTask(task: QuestTask) {
    this._http.post(`/quests/${this.currentQuest.id}/tasks`, task).subscribe((id: number) => {
      task.id = id;

      this.currentQuest.tasks.push(task);
    });
  }

  private updateTask(task: QuestTask): void {
    this._http.put(`/quests/${this.currentQuest.id}/tasks/${task.id}`, task).subscribe(() => {
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
