using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Doctor : Entity
    {
        public Guid EmployeeId { get; set; } // FK para Funcionario

        public virtual Employee Employee { get; set; }

        public string Specialty { get; set; }

        public string CRM { get; set; }

    }
}
