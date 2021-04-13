namespace SDK.Pagination
{
    public class PaginationFilter : IPaginationFilter
    {
        public int? Limit { get; set; }

        public long? Offset { get; set; }

        public string SortBy { get; set; }

        public bool? Asc { get; set; }
    }
}
