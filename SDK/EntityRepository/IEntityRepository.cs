using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public interface IEntityRepository<T>
        where T : Entity
    {
        /// <summary>
        ///     Find entity by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ValueTask<T> Find(long id);

        Task<T> FindIncluding(long id, params Expression<Func<T, object>>[] includeProperties);
        Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate);

        Task<T> Add(T entity);
        Task AddRange(IEnumerable<T> entities);
        Task<T> Update(T entity);
        Task Remove(T entity);
        Task Remove(long id);

        Task<IEnumerable<T>> FindAll();
        Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> FindAllIncluding(params Expression<Func<T, object>>[] includeProperties);

        Task<IEnumerable<T>> FindAllIncluding(Expression<Func<T, bool>> predicate,
            params Expression<Func<T, object>>[] includeProperties);

        Task<IEnumerable<TResult>> FindAllIncludingSelecting<TResult>(Expression<Func<T, bool>> predicate,
            Expression<Func<T, TResult>> selectExpression,
            params Expression<Func<T, object>>[] includeProperties);

        Task<bool> Any(Expression<Func<T, bool>> predicate);
        Task<long> CountAll();
        Task<long> CountWhere(Expression<Func<T, bool>> predicate);
        DbContext GetContext();
    }
}
