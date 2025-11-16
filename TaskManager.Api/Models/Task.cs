namespace TaskManager.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }              // Unique ID for each task
        public string Title { get; set; }  = string.Empty;     // Task title
        public string Description { get; set; }  = string.Empty;// Task details
        public bool IsCompleted { get; set; }    // Status
    }
}
