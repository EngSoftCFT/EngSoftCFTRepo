using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Patient : EntityString
    {
        public double Weight { get; set; }

        public double Height { get; set; }

        public string BloodType { get; set; }
    }
}