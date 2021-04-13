using System;

namespace ClinicControlCenter.Domain.ViewModels {
    public class AppointmentViewModel {
        public DateTimeOffset Date { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string DoctorId { get; set; } //FK para Doctor

        public virtual UserViewModel User { get; set; }

        public virtual DoctorViewModel Doctor { get; set; }
    }
}
