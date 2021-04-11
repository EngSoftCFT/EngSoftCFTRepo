using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ClinicControlCenter.Domain.Models;
using IdentityModel;
using IdentityServer4.AspNetIdentity;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace ClinicControlCenter.Security
{
    public class ProfileService : ProfileService<User>
    {
        public ProfileService(UserManager<User> userManager, IUserClaimsPrincipalFactory<User> claimsFactory)
            : base(userManager, claimsFactory)
        { }

        protected override async Task GetProfileDataAsync(ProfileDataRequestContext context, User user)
        {
            await base.GetProfileDataAsync(context, user);

            var roles = await UserManager.GetRolesAsync(user);

            var roleClaims = roles.Select(role => new Claim(JwtClaimTypes.Role, role)).ToList();

            context.IssuedClaims.AddRange(roleClaims);
        }
    }
}