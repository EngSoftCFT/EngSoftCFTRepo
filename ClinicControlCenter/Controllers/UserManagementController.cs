using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ClinicControlCenter.Domain.Filters;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Domain.ViewModels;
using ClinicControlCenter.Security;
using Microsoft.AspNetCore.Identity;
using SDK.EntityRepository;
using SDK.EntityRepository.Implementations;
using SDK.EntityRepository.Modules.Pagination;
using SDK.Pagination;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicControlCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IEntityRepository<User> _userRepository;
        private readonly IEntityRepository<Patient> _patientRepository;
        private readonly IEntityRepository<Employee> _employeeRepository;
        private readonly IEntityRepository<Doctor> _doctorRepository;


        public UserManagementController(RoleManager<IdentityRole> roleManager,
                                        UserManager<User> userManager,
                                        IMapper mapper,
                                        IEntityRepository<User> userRepository)
        {
            _roleManager    = roleManager;
            _userManager    = userManager;
            _mapper         = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> Get([FromQuery] UserFilter filter)
        {
            // TODO: Filter
            var query = _userManager.Users;
            var viewQuery = query.ProjectTo<UserViewModel>(_mapper.ConfigurationProvider);
            var paginatedValues = await PaginationHelper<UserViewModel>.PaginateResult(viewQuery, filter);
            return Ok(paginatedValues);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserViewModel>> Get(string id)
        {
            return Ok(await _userRepository.Find(id));
        }

        // TODO: Everything
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{ }

        // TODO: Everything
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{ }

        // TODO: Everything
        // DELETE api/<UserManagementController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{ }

        [HttpPut("to-patient/{id}")]
        public async Task<ActionResult> ToPatient([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return BadRequest("No user for this ID");

            var removeResult = await _userManager.RemoveFromRolesAsync(user, SecurityConfig.ROLES);
            var addRoleResult = await _userManager.AddToRoleAsync(user, SecurityConfig.PATIENT_ROLE);
            return Ok();
        }

        [HttpPut("to-employee/{id}")]
        public async Task<ActionResult> ToEmployee([FromRoute] string id)
        {
            return Ok();
        }

        [HttpPut("to-doctor/{id}")]
        public async Task<ActionResult> ToDoctor([FromRoute] string id)
        {
            return Ok();
        }

        [HttpPut("to-manager/{id}")]
        public async Task<ActionResult> ToManager([FromRoute] string id)
        {
            return Ok();
        }

        private async Task<ActionResult<User>> SetupUserRoles(string userId, string roleToAddOrMaintain = null)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest("No user for this ID");

            var rolesToRemove = GetRolesToRemove(roleToAddOrMaintain);
            await RemoveRoles(user, rolesToRemove.ToArray());

            return user;
        }

        private async Task AddRoles(User user, string roleToAdd)
        {
            //if (roleToAdd == SecurityConfig.PATIENT_ROLE)
            //    _patientRepository.AddOrUpdate();
        }

        private IEnumerable<string> GetRolesToRemove(string roleToMaintain = null)
        {
            if (roleToMaintain == SecurityConfig.PATIENT_ROLE)
                return new List<string>();

            var parentRoles = SecurityConfig.GetParentRoles(roleToMaintain)
                                            .ToList();

            if (parentRoles.Contains(SecurityConfig.PATIENT_ROLE))
                parentRoles.Remove(SecurityConfig.PATIENT_ROLE);

            return parentRoles;
        }

        private async Task RemoveRoles(User user, string[] rolesToRemove)
        {
            //if (rolesToRemove.Contains(SecurityConfig.DOCTOR_ROLE) && user.Doctor != null)
            //{
            //    await _doctorRepository.Remove(user.Doctor);
            //    user.Doctor = null;
            //}

            //if (rolesToRemove.Contains(SecurityConfig.EMPLOYEE_ROLE) && user.Employee != null)
            //{
            //    await _employeeRepository.Remove(user.Employee);
            //    user.Employee = null;
            //}

            //if (rolesToRemove.Contains(SecurityConfig.PATIENT_ROLE) && user.Patient != null)
            //{
            //    await _patientRepository.Remove(user.Patient);
            //    user.Patient = null;
            //}

            await _userManager.RemoveFromRolesAsync(user, rolesToRemove);
        }
    }
}