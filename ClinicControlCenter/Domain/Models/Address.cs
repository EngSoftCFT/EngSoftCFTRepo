using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;
using SDK.EntityRepository.Implementations.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class Address : EntityLong
    {
        public string CEP { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

    }
}
