using SDK.EntityRepository.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Patient : Entity
    {
        public long UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public double Weight { get; set; }

        public double Height { get; set; }

        public string BloodType { get; set; }
    }
}
