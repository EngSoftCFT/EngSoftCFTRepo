using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Appointment : Entity
    {
        public DateTimeOffset Date { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public long DoctorId { get; set; } //FK para Doctor

        public virtual Doctor Doctor { get; set; }
    }
}
