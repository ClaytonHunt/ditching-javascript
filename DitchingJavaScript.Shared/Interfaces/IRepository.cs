using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DitchingJavaScript.Shared.Interfaces
{
    public interface IRepository<T>
    {
        Task<int> Create(T item);
        Task<T> ReadById(int id);
        Task<IList<T>> ReadAll(Expression<Func<T, bool>> predicate);
        Task<int> Update(T item);
        Task Delete(T item);
        IRepository<T> Include(Expression<Func<T, object>> path);
    }
}
