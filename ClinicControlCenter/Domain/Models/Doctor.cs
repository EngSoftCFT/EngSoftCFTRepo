using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Doctor : EntityString
    {
        public string Specialty { get; set; }

        public string CRM { get; set; }

    }
}
