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
    [Route("quests")]
    public class QuestController : Controller
    {
        private readonly IRepository<QuestLine> _questRepository;

        public QuestController(IRepository<QuestLine> questRepository)
        {
            _questRepository = questRepository;
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateQuest(QuestLine quest)
        {
            return Ok(await _questRepository.Create(quest));
        }

        [HttpGet("{id?}")]
        [ProducesResponseType(typeof(QuestLine), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IList<QuestLine>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetQuests(int? id = null)
        {
            var result = await _questRepository.ReadAll(ql => id == null || ql.Id == id);

            if (id != null && result.Count == 0)
            {
                return NotFound();
            }

            return id == null ? Ok(result) : Ok(result.First());
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateQuest(int id, QuestLine quest)
        {
            if (quest.Id != id)
            {
                return BadRequest();
            }

            return Ok(await _questRepository.Update(quest));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteQuest(int id)
        {
            var quest = await _questRepository.ReadById(id);

            if (quest == null)
            {
                return BadRequest();
            }

            await _questRepository.Delete(quest);

            return Ok();
        }
    }
}