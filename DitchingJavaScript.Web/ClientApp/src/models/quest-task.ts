import { QuestLine } from "./quest-line";
import { Reward } from "./reward";

export class QuestTask {
  public id: number;
  public name: string;
  public createdBy: string;
  public isBeingWorked: boolean;
  public isCompleted: boolean;
  public requiresVerification: boolean;
  public quest: QuestLine;
  public rewards: Array<Reward>;

  constructor(data: any = {}) {
    const defaults: any = {
      quest: {},
      rewards: [],
      ...data
    };

    this.id = defaults.id;
    this.name = defaults.name;
    this.createdBy = defaults.createdBy;
    this.isBeingWorked = defaults.isBeingWorked;
    this.isCompleted = defaults.isCompleted;
    this.requiresVerification = defaults.requiresVerification;
    this.quest = defaults.quest;
    this.rewards = defaults.rewards;
  }

  public clone(): QuestTask {
    const result = new QuestTask();

    result.id = this.id;
    result.name = this.name;
    result.createdBy = this.createdBy;
    result.isCompleted = this.isCompleted;
    result.isBeingWorked = this.isBeingWorked;
    result.requiresVerification = this.requiresVerification;
    result.quest = this.quest;
    result.rewards = this.rewards;

    return result;
  }
}
