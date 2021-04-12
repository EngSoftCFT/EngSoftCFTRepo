using System;

namespace ClinicControlCenter.Domain.ViewModels
{
    public class AppointmentTimeViewModel
    {
        public string DoctorId { get; set; }

        public DateTimeOffset AppointmentTime { get; set; }

        public bool IsAvailable { get; set; } = true;
    }
}