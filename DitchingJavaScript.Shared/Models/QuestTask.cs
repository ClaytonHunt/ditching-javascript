using System.Collections.Generic;

namespace DitchingJavaScript.Shared.Models
{
    public class QuestTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public bool IsBeingWorked { get; set; }
        public bool IsCompleted { get; set; }
        public bool RequiresVerification { get; set; }
        public QuestLine Quest { get; set; }
        public ICollection<Reward> Rewards { get; set; }
        public QuestTask Clone()
        {
            return new QuestTask
            {
                Id = Id,
                Name = Name,
                CreatedBy = CreatedBy,
                IsCompleted = IsCompleted,
                IsBeingWorked = IsBeingWorked,
                RequiresVerification = RequiresVerification,
                Quest = Quest,
                Rewards = Rewards
            };
        }
    }
}
