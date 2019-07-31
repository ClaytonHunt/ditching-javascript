using DitchingJavaScript.Data.Repositories;
using DitchingJavaScript.Shared.Interfaces;
using DitchingJavaScript.Shared.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DitchingJavaScript.Data
{
    public static class DataStartup
    {
        public static IServiceCollection AddQuestData(this IServiceCollection services)
        {
            services.AddDbContext<QuestLineContext>(options => options.UseSqlite("Data Source=quests.db"));

            services.AddScoped<IRepository<QuestLine>, QuestRepository>();
            services.AddScoped<IRepository<QuestTask>, TaskRepository>();

            return services;
        }

        public static IServiceScopeFactory EnsureQuestData(this IServiceScopeFactory scopeFactory)
        {
            using (var scope = scopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<QuestLineContext>();

                if (db.Database.EnsureCreated())
                {
                    SeedData.Initialize(db);
                }
            }

            return scopeFactory;
        }
    }
}
