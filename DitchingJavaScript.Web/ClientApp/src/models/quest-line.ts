import { QuestTask } from "./quest-task";

export class QuestLine {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  isPermanent: boolean;
  isBeingWorked: boolean;
  tasks: Array<any> = [];
  rewards: Array<any> = [];

  constructor(data: any = {}) {
    const defaults: any = {
      tasks: [],
      rewards: [],
      ...data
    };

    this.id = defaults.id;
    this.name = defaults.name;
    this.description = defaults.description;
    this.isCompleted = defaults.isCompleted;
    this.isPermanent = defaults.isPermanent;
    this.isBeingWorked = defaults.isBeingWorked;
    this.tasks = defaults.tasks.map(t => new QuestTask({ ...t, quest: this }));
    this.rewards = defaults.rewards;
  }

  public clone(): QuestLine {
    const result = new QuestLine();

    result.id = this.id;
    result.name = this.name;
    result.description = this.description;
    result.isCompleted = this.isCompleted;
    result.isPermanent = this.isPermanent;
    result.isBeingWorked = this.isBeingWorked;

    return result;
  }
}
