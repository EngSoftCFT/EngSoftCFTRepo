using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Doctor : EntityLong
    {
        public string UserId { get; set; } // FK para Usuario

        public virtual User User { get; set; }

        public string Specialty { get; set; }

        public string CRM { get; set; }

    }
}
