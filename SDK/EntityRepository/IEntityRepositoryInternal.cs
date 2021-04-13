using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public interface IEntityRepositoryInternal<T>
        where T : IEntityBase
    {
        #region Pipeline

        DbContext GetContext();

        IQueryable<T> GetQueryable(IEnumerable<Expression<Func<T, object>>> includeProperties);

        IQueryable<T> FilterQuery(IQueryable<T> query, Expression<Func<T, bool>> predicate = null);

        IQueryable<TResult> ChangeModel<TResult>(
            IQueryable<T> query, Expression<Func<T, TResult>> selectExpression = null);

        IQueryable<T> RunPipeline(IEnumerable<Expression<Func<T, object>>> includeProperties = null,
                                  Expression<Func<T, bool>> predicate = null);

        IQueryable<TResult> RunPipeline<TResult>(
            Expression<Func<T, TResult>> selectExpression,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null,
            Expression<Func<T, bool>> predicate = null);

        #endregion
    }
}