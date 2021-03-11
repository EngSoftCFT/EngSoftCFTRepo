using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProRent.Domain.Enums;

namespace ProRent.Domain.ViewModels
{
    public class VisitViewModel
    {
        public long Id { get; set; }

        public RealEstateType Type { get; set; }

        public string Name { get; set; }

        public int Number { get; set; }

        public string Street { get; set; }

        public string Neighborhood { get; set; }

        public double Area { get; set; }

        public double RentValue { get; set; }

        public DateTimeOffset VisitTime { get; set; }
    }
}
