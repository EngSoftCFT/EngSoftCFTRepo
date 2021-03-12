using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClinicControlCenter.Domain.Models;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace ClinicControlCenter.Security
{
    public static class SecurityConfig
    {
        public const string ADMIN_ROLE = "ADMIN";
        public const string DOCTOR_ROLE = "DOCTOR";
        public const string USER_ROLE = "USER";

        private static List<string> _roles = new List<string>()
        {
            ADMIN_ROLE,
            DOCTOR_ROLE,
            USER_ROLE
        };

        public static void GetPolicies(AuthorizationOptions options)
        {
            //options.AddPolicy(ADMIN_ROLE, opt => opt.RequireRole(ADMIN_ROLE));
            //options.AddPolicy(DOCTOR_ROLE, opt => opt.RequireRole(ADMIN_ROLE, DOCTOR_ROLE));
            //options.AddPolicy(USER_ROLE, opt => opt.RequireRole(ADMIN_ROLE, DOCTOR_ROLE, USER_ROLE));
            options.AddPoliciesHierarchical(_roles.ToArray());
        }

        private static void AddPoliciesHierarchical(this AuthorizationOptions options, params string[] roles)
        {
            for (var i = 0; i < roles.Length; i++)
            {
                var currentRole = roles[i];
                var parentRoles = roles.Take(i + 1).ToArray();
                options.AddPolicy(currentRole, opt => opt.RequireRole(parentRoles));
            }
        }

        public static async Task Setup(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var scopeServices = scope.ServiceProvider;
            var roleManager = scopeServices.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = scopeServices.GetRequiredService<UserManager<ApplicationUser>>();

            await SetupRoles(roleManager);
            await SetupDefaultAdmin(userManager);
        }

        private static async Task SetupRoles<T>(RoleManager<T> roleManager)
            where T : IdentityRole, new()
        {
            foreach (var role in _roles)
                await roleManager.AddRole(role);
        }

        private static async Task AddRole<T>(this RoleManager<T> roleManager, string roleName)
            where T : IdentityRole, new()
        {
            var roleExists = await roleManager.RoleExistsAsync(roleName);

            if (!roleExists)
            {
                // Creating admin Role    
                var role = new T()
                {
                    Name = roleName
                };
                await roleManager.CreateAsync(role);
            }
        }

        public const string DEFAULT_USER_ADMIN_USERNAME = "root";
        public const string DEFAULT_USER_ADMIN_PASSWORD = "Admin@123";

        private static async Task SetupDefaultAdmin<T>(UserManager<T> userManager)
            where T : IdentityUser, new()
        {
            // Creating Default Admin            

            var user = new T()
            {
                UserName = DEFAULT_USER_ADMIN_USERNAME,
            };

            var chkUser = await userManager.CreateAsync(user, DEFAULT_USER_ADMIN_PASSWORD);

            // Add user to admin Role
            if (chkUser.Succeeded)
            {
                var result = await userManager.AddToRoleAsync(user, ADMIN_ROLE);
            }
        }
    }
}