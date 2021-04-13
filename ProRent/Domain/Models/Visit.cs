using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;
using SDK.EntityRepository.Implementations.Entities;

namespace ProRent.Domain.Models
{
    public class Visit : EntityLong
    {
        public virtual RealEstate RealEstate { get; set; }

        public long RealEstateId { get; set; }
        
        public DateTimeOffset VisitTime { get; set; }
    }
}
