using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Entities;
using SDK.Pagination;

namespace SDK.EntityRepository.Modules.Pagination
{
    public static partial class PaginationExtensions
    {
        public static async Task<PaginationResult<T>> FindAllPaginated<T>(
            this IEntityRepository<T> repository,
            IPaginationFilter pageFilter,
            Expression<Func<T, bool>> predicate = null,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null,
            string defaultOrder = "Id", bool defaultSort = true)
            where T : class, IEntityBase
        {
            var query = repository.RunPipeline(includeProperties, predicate);

            var result = PaginationHelper<T>
                .PaginateResult(query, pageFilter, defaultOrder, defaultSort);
            return await result;
        }

        public static async Task<PaginationResult<TResult>> FindAllSelectingPaginated<T, TResult>(
            this IEntityRepository<T> repository,
            IPaginationFilter pageFilter,
            Expression<Func<T, TResult>> selectExpression,
            Expression<Func<T, bool>> predicate = null,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null,
            string defaultOrder = "Id", bool defaultSort = true)
            where T : class, IEntityBase
        {
            var query = repository.RunPipeline(selectExpression, includeProperties, predicate);

            var result = PaginationHelper<TResult>
                .PaginateResult(query, pageFilter, defaultOrder, defaultSort);
            return await result;
        }
    }
}