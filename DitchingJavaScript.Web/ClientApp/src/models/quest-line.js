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
var quest_task_1 = require("./quest-task");
var QuestLine = /** @class */ (function () {
    function QuestLine(data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        this.tasks = [];
        this.rewards = [];
        var defaults = __assign({ tasks: [], rewards: [] }, data);
        this.id = defaults.id;
        this.name = defaults.name;
        this.description = defaults.description;
        this.isCompleted = defaults.isCompleted;
        this.isPermanent = defaults.isPermanent;
        this.isBeingWorked = defaults.isBeingWorked;
        this.tasks = defaults.tasks.map(function (t) { return new quest_task_1.QuestTask(__assign({}, t, { quest: _this })); });
        this.rewards = defaults.rewards;
    }
    QuestLine.prototype.clone = function () {
        var result = new QuestLine();
        result.id = this.id;
        result.name = this.name;
        result.description = this.description;
        result.isCompleted = this.isCompleted;
        result.isPermanent = this.isPermanent;
        result.isBeingWorked = this.isBeingWorked;
        return result;
    };
    return QuestLine;
}());
exports.QuestLine = QuestLine;
//# sourceMappingURL=quest-line.js.map