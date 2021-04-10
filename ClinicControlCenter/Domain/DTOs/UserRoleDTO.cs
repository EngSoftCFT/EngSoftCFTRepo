using System;
using System.Text.Json.Serialization;

namespace ClinicControlCenter.Domain.DTOs
{
    public class UserRoleDTO
    {
        [JsonIgnore]
        public string UserId { get; set; }

        #region Employee

        public DateTimeOffset? ContractDate { get; set; }

        public decimal? Salary { get; set; }

        #endregion

        #region Doctor

        public string Specialty { get; set; }

        public string CRM { get; set; }

        #endregion

        #region Patient

        public double? Weight { get; set; }

        public double? Height { get; set; }

        public string BloodType { get; set; }

        #endregion
    }
}