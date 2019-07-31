using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DitchingJavaScript.Shared.Interfaces;
using DitchingJavaScript.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace DitchingJavaScript.Data.Repositories
{
    public class TaskRepository : IRepository<QuestTask>
    {
        private readonly DbSet<QuestTask> _dbSet;
        private readonly QuestLineContext _context;
        private readonly IList<Expression<Func<QuestTask, object>>> _modifiers;

        protected IQueryable<QuestTask> DbSet =>
            _modifiers.Aggregate((IQueryable<QuestTask>)_dbSet, (current, include) =>
                current.Include(include));

        public TaskRepository(QuestLineContext context)
        {
            _context = context;
            _dbSet = context.Set<QuestTask>();
            _modifiers = new List<Expression<Func<QuestTask, object>>>();
        }

        public async Task<int> Create(QuestTask item)
        {
            _dbSet.Add(item);
            await _context.SaveChangesAsync();

            return item.Id;
        }

        public async Task<QuestTask> ReadById(int id)
        {
            return await DbSet.AsNoTracking().FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<IList<QuestTask>> ReadAll(Expression<Func<QuestTask, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task<int> Update(QuestTask item)
        {
            _dbSet.Attach(item).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return item.Id;
        }

        public async Task Delete(QuestTask item)
        {
            _dbSet.Attach(item).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
        }

        public IRepository<QuestTask> Include(Expression<Func<QuestTask, object>> path)
        {
            _modifiers.Add(path);

            return this;
        }
    }
}
