using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Patient : EntityLong
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public double Weight { get; set; }

        public double Height { get; set; }

        public string BloodType { get; set; }
    }
}
