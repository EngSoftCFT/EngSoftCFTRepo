namespace SDK.Pagination
{
    public interface IPaginationFilter
    {
        public int? Limit { get; set; }

        public long? Offset { get; set; }

        public string SortBy { get; set; }

        public bool? Asc { get; set; }

        public bool HasOrder => !string.IsNullOrWhiteSpace(SortBy);
    }
}
