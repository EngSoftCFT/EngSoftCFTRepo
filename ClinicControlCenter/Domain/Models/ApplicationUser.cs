using Microsoft.AspNetCore.Identity;

namespace ClinicControlCenter.Domain.Models {
    public class ApplicationUser : IdentityUser {
        public string FullName { get; set; }

        public string Telephone { get; set; }

        public string CEP { get; set; }

        public string Street { get; set; }

        public string Neighborhood { get; set; }

        public string City { get; set; }

        public string State { get; set; }

    }
}
