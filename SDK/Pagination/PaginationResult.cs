using System.Collections.Generic;

namespace SDK.Pagination
{
    public class PaginationResult<T>
    {
        public PaginationResult(IEnumerable<T> items, long totalCount)
        {
            Items = items;
            TotalCount = totalCount;
        }

        public IEnumerable<T> Items { get; }

        public long TotalCount { get; }
    }
}
