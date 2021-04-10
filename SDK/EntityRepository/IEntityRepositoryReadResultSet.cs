using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SDK.EntityRepository
{
    public interface IEntityRepositoryReadResultSet<T>
    {
        /// <summary>
        ///     Find entity by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        Task<T> Find(IConvertible id, params Expression<Func<T, object>>[] includeProperties);

        Task<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);

        Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> predicate = null,
                                     params Expression<Func<T, object>>[] includeProperties);

        Task<IEnumerable<TResult>> FindAllSelecting<TResult>(
            Expression<Func<T, TResult>> selectExpression, Expression<Func<T, bool>> predicate = null,
            params Expression<Func<T, object>>[] includeProperties);
    }
}