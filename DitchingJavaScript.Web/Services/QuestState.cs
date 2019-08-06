using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Resources;
using System.Threading.Tasks;
using DitchingJavaScript.Shared.Models;
using Microsoft.AspNetCore.Components;

namespace DitchingJavaScript.Web.Services
{
    public class QuestState
    {
        private readonly HttpClient _http;
        private QuestLine _questClone;
        private QuestTask _taskClone;

        public event EventHandler OnStateChanged;
        public IList<QuestLine> Quests { get; set; } = new List<QuestLine>();
        public QuestLine CurrentQuest { get; private set; }
        public QuestTask CurrentTask { get; private set; }

        public QuestState(HttpClient http)
        {
            _http = http;

            _ = PopulateQuests();
        }

        public bool IsCurrentQuest(QuestLine quest)
        {
            return quest == CurrentQuest;
        }

        public async Task PopulateQuests()
        {
            Quests = await _http.GetJsonAsync<IList<QuestLine>>("/quests");
            StateHasChanged();
        }

        public async Task SelectQuest(QuestLine quest)
        {
            ClearUnsavedQuestChanges();

            CurrentQuest = quest;
            _questClone = quest.Clone();
            CurrentTask = null;
            _taskClone = null;

            if (CurrentQuest.Tasks.Count <= 0)
            {
                CurrentQuest.Tasks = await _http.GetJsonAsync<IList<QuestTask>>($"/quests/{quest.Id}/tasks");
            }

            StateHasChanged();
        }

        public async Task SaveQuest(QuestLine quest)
        {
            var isNew = quest.Id == default;

            if (isNew)
            {
                await CreateQuest(quest);
            }
            else
            {
                await UpdateQuest(quest);
            }

            StateHasChanged();
        }

        public async Task DeleteQuest(QuestLine quest)
        {
            await _http.DeleteAsync($"/quests/{quest.Id}");

            if (quest == CurrentQuest)
            {
                CurrentQuest = null;
                _questClone = null;
            }

            Quests.Remove(quest);

            StateHasChanged();
        }

        public async Task UpdateQuestStatus(QuestLine quest)
        {
            quest.IsCompleted = !quest.IsPermanent && quest.Tasks.All(t => t.IsCompleted);
            quest.IsBeingWorked = !quest.IsCompleted && quest.IsBeingWorked;

            await _http.PutJsonAsync($"/quests/{quest.Id}", quest);

            StateHasChanged();
        }

        public async Task ToggleQuest(QuestLine quest)
        {
            quest.IsBeingWorked = !quest.IsBeingWorked;

            try
            {
                await _http.PutJsonAsync($"/quests/{quest.Id}", quest);
            }
            catch
            {
                quest.IsBeingWorked = !quest.IsBeingWorked;
            }

            StateHasChanged();
        }

        public void SelectTask(QuestTask task)
        {
            ClearUnsavedTaskChanges();

            CurrentTask = task;
            _taskClone = task.Clone();

            StateHasChanged();
        }

        public async Task ToggleTask(QuestTask task)
        {
            task.IsCompleted = !task.IsCompleted;

            try
            {
                await _http.PutJsonAsync($"/quests/{CurrentQuest.Id}/tasks/{task.Id}", task);
                await UpdateQuestStatus(CurrentQuest);
            }
            catch
            {
                task.IsCompleted = !task.IsCompleted;
            }

            StateHasChanged();
        }

        public async Task SaveTask(QuestTask task)
        {
            var isNew = task.Id == default;

            if (isNew)
            {
                await CreateTask(task);
            }
            else
            {
                await UpdateTask(task);
            }

            _taskClone = task.Clone();

            StateHasChanged();
        }

        public async Task DeleteTask(QuestTask task)
        {
            await _http.DeleteAsync($"/quests/{CurrentQuest.Id}/tasks/{task.Id}");

            if (task == CurrentTask)
            {
                CurrentTask = null;
                _taskClone = null;
            }

            CurrentQuest.Tasks.Remove(task);
        }

        public bool IsCurrentTask(QuestTask task)
        {
            return task == CurrentTask;
        }

        public async Task<int> CreateQuest(QuestLine quest)
        {
            var id = await _http.PostJsonAsync<int>("/quests", quest);
            quest.Id = id;

            _questClone = quest;

            Quests.Add(quest);

            return id;
        }

        public async Task UpdateQuest(QuestLine quest)
        {
            await _http.PutJsonAsync($"/quests/{quest.Id}", quest);

            _questClone = null;

            StateHasChanged();
        }

        public async Task<int> CreateTask(QuestTask task)
        {
            var id = await _http.PostJsonAsync<int>($"/quests/{CurrentQuest.Id}/ tasks", task);

            task.Id = id;

            CurrentQuest.Tasks.Add(task);

            StateHasChanged();

            return id;
        }

        public async Task UpdateTask(QuestTask task)
        {
            await _http.PutJsonAsync($"/quests/${CurrentQuest.Id}/tasks/${task.Id}", task);

            _taskClone = null;

            StateHasChanged();
        }

        private void ClearUnsavedQuestChanges() {
            if (_questClone != null)
            {
                CurrentQuest.Name = _questClone.Name;
                CurrentQuest.Description = _questClone.Description;
            }
        }

        private void ClearUnsavedTaskChanges() {
            if (_taskClone != null)
            {
                CurrentTask.Name = _taskClone.Name;
            }
        }

        private void StateHasChanged()
        {
            OnStateChanged?.Invoke(this, EventArgs.Empty);
        }
    }
}
