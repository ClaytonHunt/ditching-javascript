using System.Linq;
using DitchingJavaScript.Shared.Models;

namespace DitchingJavaScript.Data
{
    public static class SeedData
    {
        public static void Initialize(QuestLineContext db)
        {
            var quests = new[]
            {
                new QuestLine
                {
                    Id = 1,
                    Name = "Miscellaneous",
                    Description = "",
                    IsPermanent = true
                },
                new QuestLine
                {
                    Id = 2,
                    Name = "Create Todo List",
                    Description = "Create a Skyrim based Todo List that will help to gamify getting things done.",
                    IsPermanent = false
                },
                new QuestLine
                {
                    Id = 3,
                    Name = "Demo Blazor Features",
                    Description = "Blazor is a single-page app framework for building interactive client-side Web apps with .NET. Blazor uses open web standards without plugins or code transpilation. Blazor works in all modern web browsers, including mobile browsers.",
                    IsPermanent = false
                }
            };

            var tasks = new[]
            {
                new QuestTask
                {
                    Id = 1,
                    Name = "Make the todo list look like Skyrim",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 2,
                    Name = "Add Sub Tasks",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 3,
                    Name = "Add Task Rewards",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 4,
                    Name = "Add Task Actions",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 5,
                    Name = "Discuss prerequisites",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 6,
                    Name = "File->New Project",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 7,
                    Name = "Razor Syntax",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 8,
                    Name = "Http interaction using HttpClient",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },                
                new QuestTask
                {
                    Id = 9,
                    Name = "Binding to Events",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 10,
                    Name = "Routing",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 11,
                    Name = "Two-Way data binding",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 12,
                    Name = "Application State",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 13,
                    Name = "Razor Components",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                },
                new QuestTask
                {
                    Id = 14,
                    Name = "Add Component Library",
                    CreatedBy = "Clayton Hunt",
                    IsCompleted = false,
                    RequiresVerification = false
                }
            };

            quests.Single(q => q.Id == 1).Tasks = tasks.Where(t => new[] { 1 }.Any(x => x == t.Id)).ToList();
            quests.Single(q => q.Id == 2).Tasks = tasks.Where(t => new[] { 2, 3, 4 }.Any(x => x == t.Id)).ToList();
            quests.Single(q => q.Id == 3).Tasks = tasks.Where(t => new[] { 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 }.Any(x => x == t.Id)).ToList();

            db.Quests.AddRange(quests);
            db.Tasks.AddRange(tasks);
            db.SaveChanges();
        }
    }
}
