"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestState = /** @class */ (function () {
    //        public QuestTask CurrentTask { get; set; }
    function QuestState(_http) {
        this._http = _http;
        // private _taskClone: QuestTask;
        //        public event EventHandler OnStateChanged;
        this.quests = [];
        // _ = PopulateQuests();
    }
    QuestState.prototype.isCurrentQuest = function (quest) {
        return quest === this.currentQuest;
    };
    return QuestState;
}());
exports.QuestState = QuestState;
//# sourceMappingURL=questState.js.map