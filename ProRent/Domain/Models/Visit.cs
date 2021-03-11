using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;

namespace ProRent.Domain.Models
{
    public class Visit : Entity
    {
        public virtual RealEstate RealEstate { get; set; }

        public long RealEstateId { get; set; }
        
        public DateTimeOffset VisitTime { get; set; }
    }
}
