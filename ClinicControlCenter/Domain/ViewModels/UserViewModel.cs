namespace ClinicControlCenter.Domain.ViewModels {
    public class UserViewModel  {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
        
        public string FullName { get; set; }

        public string Telephone { get; set; }

        public string CEP { get; set; }

        public string Street { get; set; }

        public string Neighborhood { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        #region User Relationships

        public bool IsManager { get; set; }

        public bool IsDoctor { get; set; }

        public bool IsEmployee { get; set; }

        public bool IsPatient { get; set; }

        public virtual PatientViewModel Patient { get; set; }

        public virtual EmployeeViewModel Employee { get; set; }

        public virtual DoctorViewModel Doctor { get; set; }

        #endregion
    }
}
