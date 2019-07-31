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
    public class QuestRepository : IRepository<QuestLine>
    {
        private readonly DbSet<QuestLine> _dbSet;
        private readonly QuestLineContext _context;
        private readonly IList<Expression<Func<QuestLine, object>>> _modifiers;

        protected IQueryable<QuestLine> DbSet => 
            _modifiers.Aggregate((IQueryable<QuestLine>)_dbSet, (current, include) => 
                current.Include(include));

        public QuestRepository(QuestLineContext context)
        {
            _context = context;
            _dbSet = context.Set<QuestLine>();
            _modifiers = new List<Expression<Func<QuestLine, object>>>();
        }

        public async Task<int> Create(QuestLine item)
        {
            _dbSet.Add(item);
            await _context.SaveChangesAsync();

            return item.Id;
        }

        public async Task<QuestLine> ReadById(int id)
        {
            return await DbSet.AsNoTracking().FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<IList<QuestLine>> ReadAll(Expression<Func<QuestLine, bool>> predicate)
        {
           return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task<int> Update(QuestLine item)
        {
            _dbSet.Attach(item).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return item.Id;
        }

        public async Task Delete(QuestLine item)
        {
            _dbSet.Attach(item).State = EntityState.Deleted;

            var tasks = _context.Tasks.Where((t) => t.Quest.Id == item.Id);

            foreach (var t in tasks)
            {
                _context.Entry(t).State = EntityState.Deleted;
            }

            await _context.SaveChangesAsync();
        }

        public IRepository<QuestLine> Include(Expression<Func<QuestLine, object>> path)
        {
            _modifiers.Add(path);

            return this;
        }
    }
}
