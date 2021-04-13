namespace ClinicControlCenter.Domain.DTOs
{
    public class UserDTO
    {
        public string Password { get; set; }

        #region IdentityBase

        public string UserName { get; set; }

        public string Email { get; set; }

        #endregion

        public string FullName { get; set; }

        public string Telephone { get; set; }

        public string CEP { get; set; }

        public string Street { get; set; }

        public string Neighborhood { get; set; }

        public string City { get; set; }

        public string State { get; set; }
    }
}