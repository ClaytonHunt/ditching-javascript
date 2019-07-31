"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var QuestTask = /** @class */ (function () {
    function QuestTask(data) {
        if (data === void 0) { data = {}; }
        var defaults = __assign({ quest: {}, rewards: [] }, data);
        this.id = defaults.id;
        this.name = defaults.name;
        this.createdBy = defaults.createdBy;
        this.isBeingWorked = defaults.isBeingWorked;
        this.isCompleted = defaults.isCompleted;
        this.requiresVerification = defaults.requiresVerification;
        this.quest = defaults.quest;
        this.rewards = defaults.rewards;
    }
    QuestTask.prototype.clone = function () {
        var result = new QuestTask();
        result.id = this.id;
        result.name = this.name;
        result.createdBy = this.createdBy;
        result.isCompleted = this.isCompleted;
        result.isBeingWorked = this.isBeingWorked;
        result.requiresVerification = this.requiresVerification;
        result.quest = this.quest;
        result.rewards = this.rewards;
        return result;
    };
    return QuestTask;
}());
exports.QuestTask = QuestTask;
//# sourceMappingURL=quest-task.js.map