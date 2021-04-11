using System;

namespace ClinicControlCenter.Domain.DTOs {
    public class NewAppointmentDTO {
        public DateTimeOffset Date { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string DoctorId { get; set; } //FK para Doctor
    }
}
