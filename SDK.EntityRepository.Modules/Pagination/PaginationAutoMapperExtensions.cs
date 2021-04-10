using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;
using SDK.EntityRepository.Modules.AutoMapper;
using SDK.Pagination;

namespace SDK.EntityRepository.Modules.Pagination
{
    public static class PaginationAutoMapperExtensions {
        public static async Task<PaginationResult<TResult>> FindAllPaginated<TEntity, TResult>(
            this AutoMapperModule<TEntity,TResult>  autoMapperModule,
            IPaginationFilter pageFilter,
            Expression<Func<TEntity, bool>> predicate = null,
            IEnumerable<Expression<Func<TEntity, object>>> includeProperties = null,
            string defaultOrder = "Id", bool defaultSort = true)
            where TEntity : class, IEntityBase
        {
            var query = autoMapperModule.RunPipeline(includeProperties, predicate);

            var result = PaginationHelper<TResult>
                .PaginateResult(query, pageFilter, defaultOrder, defaultSort);
            return await result;
        }
    }
}