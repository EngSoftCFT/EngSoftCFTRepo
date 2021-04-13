using System;
using System.Collections.Generic;

namespace ClinicControlCenter.Domain.Filters
{
    public class AvailableAppointmentsFilter
    {
        public int TimeOffsetSeconds { get; set; } = 0;

        public IEnumerable<DateTimeOffset> RequestedMonths { get; set; } = new List<DateTimeOffset>();

        public IEnumerable<string> RequestedDoctors { get; set; } = new List<string>();
    }
}