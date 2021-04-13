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
        public const string MANAGER_ROLE = "MANAGER";
        public const string DOCTOR_ROLE = "DOCTOR";
        public const string EMPLOYEE_ROLE = "EMPLOYEE";
        public const string PATIENT_ROLE = "PATIENT";
        public const string USER_ROLE = "USER";

        // Smaller number means it is upper in the hierarchy
        public static readonly Dictionary<string, int> ROLE_HIERARCHY = new Dictionary<string, int>()
        {
            { ADMIN_ROLE, 0 },
            { MANAGER_ROLE, 1 },
            { DOCTOR_ROLE, 2 },
            { EMPLOYEE_ROLE, 3 },
            { PATIENT_ROLE, 4 },
            { USER_ROLE, 4 },
        };

        public static readonly List<string> ROLES = ROLE_HIERARCHY.Keys.ToList();

        public static bool HasPermission(IEnumerable<string> userRoles, string minimumRole)
        {
            var userPermissionLevel =
                userRoles.Min(x => ROLE_HIERARCHY.TryGetValue(x, out var lvl) ? lvl : double.PositiveInfinity);

            var minimumRolePermLevel =
                ROLE_HIERARCHY.TryGetValue(minimumRole, out var lvl) ? lvl : double.PositiveInfinity;

            return userPermissionLevel <= minimumRolePermLevel;
        }

        public static IEnumerable<string> GetParentRoles(string role)
        {
            if (string.IsNullOrEmpty(role) ||
                !SecurityConfig.ROLE_HIERARCHY.TryGetValue(role, out var roleHierarchyLevel))
                return ROLES;

            var parentRoles = ROLE_HIERARCHY
                              .Where(x => x.Value < roleHierarchyLevel)
                              .Select(x => x.Key);
            return parentRoles;
        }

        public static void GetPolicies(AuthorizationOptions options)
        {
            options.AddPoliciesHierarchical(ROLES.ToArray());
        }

        private static void AddPoliciesHierarchical(this AuthorizationOptions options, params string[] roles)
        {
            for (var i = 0; i < roles.Length; i++)
            {
                var currentRole = roles[i];
                var requiredRoles = GetParentRoles(currentRole).Append(currentRole);
                options.AddPolicy(currentRole, opt => opt.RequireRole(requiredRoles));
            }
        }

        public static async Task Setup(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var scopeServices = scope.ServiceProvider;
            var roleManager = scopeServices.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = scopeServices.GetRequiredService<UserManager<User>>();

            await SetupRoles(roleManager);
            await SetupDefaultAdmin(userManager);
        }

        private static async Task SetupRoles<T>(RoleManager<T> roleManager)
            where T : IdentityRole, new()
        {
            foreach (var role in ROLES)
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