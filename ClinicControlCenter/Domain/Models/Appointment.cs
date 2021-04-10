using System;
using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Appointment : EntityLong
    {
        public DateTimeOffset Date { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public long DoctorId { get; set; } //FK para Doctor

        public virtual Doctor Doctor { get; set; }
    }
}
