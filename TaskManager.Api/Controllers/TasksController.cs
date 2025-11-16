using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private static List<TaskItem> tasks = new List<TaskItem>();
        private static int nextId = 1;

        // GET: api/task
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTask()
        {
            return Ok(tasks);
        }

        // POST: api/task
        [HttpPost]
        public ActionResult<TaskItem> CreateTask(TaskItem task)
        {
            task.Id = nextId++;
            tasks.Add(task);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/task/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, TaskItem updateTask)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Title = updateTask.Title;
            task.Description = updateTask.Description;
            task.IsCompleted = updateTask.IsCompleted;

            return NoContent();
        }

        // DELETE: api/task/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            tasks.Remove(task);
            return NoContent();
        }
    }
}
