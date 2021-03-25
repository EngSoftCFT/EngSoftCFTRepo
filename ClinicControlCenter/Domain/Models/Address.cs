using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Address : Entity
    {
        public string CEP { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

    }
}
