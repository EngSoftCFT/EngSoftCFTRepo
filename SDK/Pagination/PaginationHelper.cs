using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using SDK.Utils;

namespace SDK.Pagination
{
    public static class PaginationHelper<T>
    {
        public static async Task<PaginationResult<T>> PaginateResult(IQueryable<T> queryable,
            IPaginationFilter pageFilter, string defaultOrder = "Id", bool defaultSort = true)
        {
            long count;
            if (queryable.Provider is IAsyncQueryProvider)
            {
                count = await queryable.LongCountAsync();
            }
            else
            {
                count = queryable.LongCount();
            }

            var query = queryable.AsQueryable();

            var sortBy = pageFilter.HasOrder ? ResolveSort(pageFilter.SortBy) ?? defaultOrder : defaultOrder;

            query = pageFilter.Asc ?? defaultSort
                ? query.OrderBy(sortBy)
                : query.OrderByDescending(sortBy);

            if (pageFilter.Offset.HasValue)
            {
                query = query.LongSkip(pageFilter.Offset.Value);
            }

            if(pageFilter.Limit.HasValue)
                query = query.Take(pageFilter.Limit.Value);

            if (query is IAsyncEnumerable<T>)
            {
                return new PaginationResult<T>(await query.ToListAsync(), count);
            }

            return new PaginationResult<T>(query.ToList(), count);
        }

        private static string ResolveSort(string sortBy)
        {
            var newSort = "";
            foreach (var prop in sortBy.Split(",").Select(x => x.Trim()))
            {
                if (prop.Contains("."))
                {
                    newSort += $"{prop},";
                }

                var propSplit = prop.Split(' ').Select(x => x.Trim()).ToArray();

                string checkedProp;
                try
                {
                    var propertyInfo = typeof(T).GetProperty(propSplit[0],
                        BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                    checkedProp = propertyInfo?.Name;
                }
                catch (Exception)
                {
                    checkedProp = null;
                }

                if (!string.IsNullOrWhiteSpace(checkedProp))
                {
                    var order = propSplit.FirstOrDefault(x => x.ToLower().Equals("asc") || x.ToLower().Equals("desc"));
                    newSort += string.IsNullOrWhiteSpace(order)
                        ? $"{checkedProp},"
                        : $"{checkedProp} {order},";
                }
            }

            return string.IsNullOrWhiteSpace(newSort) ? null : newSort[..^1];
        }
    }
}
