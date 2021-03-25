using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ClinicControlCenter.Domain.Models;

namespace ClinicControlCenter.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Person> People { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Appointment> Schedule { get; set; }

        public DbSet<Address> AddressBase { get; set; }

    }
}
