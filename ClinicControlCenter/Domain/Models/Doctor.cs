using SDK.EntityRepository.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Doctor : Entity
    {
        public string UserId { get; set; } // FK para Usuario

        public virtual ApplicationUser User { get; set; }

        public string Specialty { get; set; }

        public string CRM { get; set; }

    }
}
