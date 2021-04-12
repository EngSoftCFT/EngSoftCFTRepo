using System.Collections.Generic;
using SDK.Pagination;

namespace ClinicControlCenter.Domain.Filters
{
    public class UserFilter : PaginationFilter
    {
       public string Email { get; set; }

       public string Name { get; set; }

       public string Address { get; set; }

       public IEnumerable<string> UserTypes { get; set; } = new List<string>();
    }
}