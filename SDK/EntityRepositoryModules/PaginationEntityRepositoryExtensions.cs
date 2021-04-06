using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository;
using SDK.EntityRepository.Entities;
using SDK.Pagination;

namespace SDK.EntityRepositoryModules
{
    public static class PaginationEntityRepositoryExtensions
    {
        public static Task<PaginationResult<T>> FindAllPaginated<T>(
            this IEntityRepository<T> repository,
            IPaginationFilter pageFilter,
            Expression<Func<T, bool>> wherePredicate = null,
            string defaultOrder = "Id", bool defaultSort = true)
            where T : Entity
        {
            return FindAllIncludingPaginated(repository, pageFilter, wherePredicate, null, defaultOrder, defaultSort);
        }

        public static async Task<PaginationResult<T>> FindAllIncludingPaginated<T>(
            this IEntityRepository<T> repository,
            IPaginationFilter pageFilter,
            Expression<Func<T, bool>> wherePredicate = null,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null,
            string defaultOrder = "Id", bool defaultSort = true)
            where T : Entity
        {
            var query = QueryAllIncluding(repository, wherePredicate, includeProperties);

            var result = PaginationHelper<T>
                .PaginateResult(query, pageFilter, defaultOrder, defaultSort);
            return await result;
        }

        public static async Task<PaginationResult<TResult>> FindAllIncludingSelectingPaginated<T, TResult>(
            this IEntityRepository<T> repository,
            IPaginationFilter pageFilter,
            Expression<Func<T, bool>> wherePredicate = null,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null,
            Expression<Func<T, TResult>> selectExpression = null,
            string defaultOrder = "Id", bool defaultSort = true)
            where T : Entity
        {
            var query = QueryAllIncluding(repository, wherePredicate, includeProperties);

            var selectedQuery = selectExpression != null
                                    ? query.Select(selectExpression)
                                    : (IQueryable<TResult>)query;

            var result = PaginationHelper<TResult>
                .PaginateResult(selectedQuery, pageFilter, defaultOrder, defaultSort);
            return await result;
        }

        private static IQueryable<T> QueryAllIncluding<T>(
            IEntityRepository<T> repository,
            Expression<Func<T, bool>> wherePredicate = null,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null)
            where T : Entity
        {
            var query = repository.GetContext().Set<T>().AsQueryable();

            if (wherePredicate != null)
                query = query.Where(wherePredicate);

            if (includeProperties != null)
                query = includeProperties
                    .Aggregate(query, (current, property) => current.Include(property));

            return query;
        }
    }
}