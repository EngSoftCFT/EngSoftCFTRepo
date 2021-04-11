using System;

namespace ClinicControlCenter.Domain.ViewModels
{
    public class EmployeeViewModel
    {
        public string Id { get; set; }

        public DateTimeOffset ContractDate { get; set; }

        public decimal Salary { get; set; }
    }
}