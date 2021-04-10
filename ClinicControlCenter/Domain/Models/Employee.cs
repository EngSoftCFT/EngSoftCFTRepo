using System;
using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Employee : EntityLong
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public DateTimeOffset ContractDate { get; set; }

        public decimal Salary { get; set; }

    }
}
