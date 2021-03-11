using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProRent.Domain.DTO
{
    public class VisitPostDTO
    {
        public long? RealEstateId { get; set; }

        public DateTimeOffset? VisitTime { get; set; }

    }
}
