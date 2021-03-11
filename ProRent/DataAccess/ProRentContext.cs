using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProRent.Domain.Models;

namespace ProRent.DataAccess
{
    public class ProRentContext : DbContext
    {
        public ProRentContext(DbContextOptions<ProRentContext> options, IConfiguration configuration)
            : base(options) { }

        public DbSet<RealEstate> RealEstates { get; set; }

        public DbSet<Visit> Visits { get; set; }
    }
}