using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ClinicControlCenter.Domain.Models;

namespace ClinicControlCenter.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        { }

        //public DbSet<Patient> Patients { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Appointment> Schedule { get; set; }

        public DbSet<Address> AddressBase { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Employee>()
                   .HasOne(x => x.User)
                   .WithOne()
                   .HasForeignKey<Employee>(x => x.UserId)
                   .IsRequired();

            builder.Entity<Employee>()
                   .HasKey(x => x.UserId);

            builder.Entity<Employee>()
                   .Property(x => x.Id)
                   .ValueGeneratedOnAdd();

            builder.Entity<Employee>()
                   .HasAlternateKey(x => x.Id);

            builder.Entity<Doctor>()
                   .HasOne(x => x.User)
                   .WithOne()
                   .HasForeignKey<Doctor>(x => x.UserId)
                   .IsRequired();

            builder.Entity<Doctor>()
                   .HasKey(x => x.UserId);

            builder.Entity<Doctor>()
                   .Property(x => x.Id)
                   .ValueGeneratedOnAdd();

            builder.Entity<Doctor>()
                   .HasAlternateKey(x => x.Id);
        }
    }
}