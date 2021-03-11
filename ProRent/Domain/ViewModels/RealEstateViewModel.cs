using System.Runtime.InteropServices.ComTypes;
using ProRent.Domain.Enums;

namespace ProRent.Domain.ViewModels
{
    public class RealEstateViewModel
    {
        public long Id { get; set; }

        public RealEstateType Type { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public int BedRoomQt { get; set; }

        public int SuiteQt { get; set; }

        public int GarageParkingSpace { get; set; }

        public int Area { get; set; }

        public double RentValue { get; set; }

    }
}
