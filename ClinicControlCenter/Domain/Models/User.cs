using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using SDK.EntityRepository.Entities;

namespace ClinicControlCenter.Domain.Models
{
    public class User : IdentityUser, IEntityBase<string>
    {
        public string FullName { get; set; }

        public string Telephone { get; set; }

        public string CEP { get; set; }

        public string Street { get; set; }

        public string Neighborhood { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        #region Table Navigation

        public virtual Patient Patient { get; set; }

        public virtual Employee Employee { get; set; }

        public virtual Doctor Doctor { get; set; }

        #endregion


        #region NotMapped
        // Needed cause method cant extend "EntityBase<string>"
        [NotMapped]
        IConvertible IEntityBase.Id {
            get => Id;
            set => Id = (string)value;
        }
        #endregion

    }
}