using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DitchingJavaScript.Shared.Interfaces;
using DitchingJavaScript.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DitchingJavaScript.Web.Controllers
{
    [ApiController]
    [Route("quests/{questId}/tasks")]
    public class TaskController : Controller
    {
        private readonly IRepository<QuestTask> _taskRepository;
        private readonly IRepository<QuestLine> _questRepository;

        public TaskController(IRepository<QuestTask> taskRepository, IRepository<QuestLine> questRepository)
        {
            _taskRepository = taskRepository;
            _questRepository = questRepository;
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateTask(int questId, QuestTask task)
        {
            var quest = await _questRepository.ReadById(questId);

            if (quest == null)
            {
                return BadRequest();
            }

            quest.Tasks.Add(task);

            await _questRepository.Update(quest);

            return Ok(quest.Tasks.Max(t => t.Id));
        }

        [HttpGet("{taskId?}")]
        [ProducesResponseType(typeof(QuestTask), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IList<QuestTask>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTasks(int questId, int? taskId)
        {
            var result = await GetQuestTasks(questId, taskId);

            if (taskId != null && result.Count == 0)
            {
                return NotFound();
            }

            return taskId == null ? Ok(result) : Ok(result.First());
        }

        [HttpPut("{taskId}")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateTask(int questId, int taskId, QuestTask task)
        {
            if (!IsMatchingTask(taskId, task) || !await IsQuestTask(questId, taskId))
            {
                return BadRequest();
            }

            return Ok(await _taskRepository.Update(task));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteQuest(int id)
        {
            var task = await _taskRepository.ReadById(id);

            if (task == null)
            {
                return BadRequest();
            }

            await _taskRepository.Delete(task);

            return Ok();
        }

        private async Task<bool> IsQuestTask(int questId, int taskId)
        {
            return (await GetQuestTasks(questId, taskId)).Any();
        }

        private static bool IsMatchingTask(int taskId, QuestTask task)
        {
            return task.Id == taskId;
        }

        private async Task<IList<QuestTask>> GetQuestTasks(int questId, int? taskId)
        {
            return await _taskRepository.ReadAll(t => t.Quest.Id == questId && (taskId == null || taskId == t.Id));
        }
    }
}