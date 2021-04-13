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
            DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        { }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Appointment> Schedule { get; set; }

        public DbSet<Address> AddressBase { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Employee ->
            builder.Entity<Employee>()
                   .HasOne<User>()
                   .WithOne(x => x.Employee)
                   .HasForeignKey<Employee>(x => x.Id)
                   .IsRequired();

            builder.Entity<Employee>()
                   .HasKey(x => x.Id);
            // <- Employee

            // Doctor ->
            builder.Entity<Doctor>()
                   .HasOne<User>()
                   .WithOne(x => x.Doctor)
                   .HasForeignKey<Doctor>(x => x.Id)
                   .IsRequired();

            builder.Entity<Doctor>()
                   .HasKey(x => x.Id);
            // <- Doctor

            // Patient ->
            builder.Entity<Patient>()
                   .HasOne<User>()
                   .WithOne(x => x.Patient)
                   .HasForeignKey<Patient>(x => x.Id)
                   .IsRequired();

            builder.Entity<Patient>()
                   .HasKey(x => x.Id);
            // <- Patient
        }
    }
}