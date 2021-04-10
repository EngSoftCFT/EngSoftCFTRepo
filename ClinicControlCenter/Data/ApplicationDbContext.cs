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
                   .HasOne(x => x.User)
                   .WithOne(x => x.Employee)
                   .HasForeignKey<Employee>(x => x.UserId)
                   .IsRequired();

            builder.Entity<Employee>()
                   .HasKey(x => x.UserId);

            builder.Entity<Employee>()
                   .Property(x => x.Id)
                   .ValueGeneratedOnAdd();

            builder.Entity<Employee>()
                   .HasAlternateKey(x => x.Id);
            // <- Employee

            // Doctor ->
            builder.Entity<Doctor>()
                   .HasOne(x => x.User)
                   .WithOne(x => x.Doctor)
                   .HasForeignKey<Doctor>(x => x.UserId)
                   .IsRequired();

            builder.Entity<Doctor>()
                   .HasKey(x => x.UserId);

            builder.Entity<Doctor>()
                   .Property(x => x.Id)
                   .ValueGeneratedOnAdd();

            builder.Entity<Doctor>()
                   .HasAlternateKey(x => x.Id);
            // <- Doctor

            // Patient ->
            builder.Entity<Patient>()
                   .HasOne(x => x.User)
                   .WithOne(x => x.Patient)
                   .HasForeignKey<Patient>(x => x.UserId)
                   .IsRequired();

            builder.Entity<Patient>()
                   .HasKey(x => x.UserId);

            builder.Entity<Patient>()
                   .Property(x => x.Id)
                   .ValueGeneratedOnAdd();

            builder.Entity<Patient>()
                   .HasAlternateKey(x => x.Id);
            // <- Patient
        }
    }
}