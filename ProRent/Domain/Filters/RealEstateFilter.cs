using ProRent.Domain.Enums;

namespace ProRent.Domain.Filters
{
    public class RealEstateFilter
    {
        public RealEstateType? Type { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public double? MaxArea { get; set; }

        public double? MinArea { get; set; }

        public double? maxRent { get; set; }

        public double? minRent { get; set; }
    }
}
