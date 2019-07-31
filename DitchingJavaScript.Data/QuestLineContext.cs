using DitchingJavaScript.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace DitchingJavaScript.Data
{
    public class QuestLineContext : DbContext
    {
        public QuestLineContext() { }

        public QuestLineContext(DbContextOptions options) : base(options) { }

        public DbSet<QuestLine> Quests { get; set; }

        public DbSet<QuestTask> Tasks { get; set; }

        public DbSet<Reward> Rewards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuestLine>().HasMany(ql => ql.Tasks);
            modelBuilder.Entity<QuestLine>().HasMany(ql => ql.Rewards);

            modelBuilder.Entity<QuestTask>().HasOne(qt => qt.Quest);
            modelBuilder.Entity<QuestTask>().HasMany(qt => qt.Rewards);
        }
    }
}
