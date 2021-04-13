using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ClinicControlCenter.Domain.DTOs;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Domain.ViewModels;
using ClinicControlCenter.Security;
using Microsoft.AspNetCore.Identity;
using SDK.EntityRepository;
using SDK.EntityRepository.Modules.AutoMapper;
using SDK.EntityRepository.Modules.Pagination;
using SDK.Pagination;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicControlCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IEntityRepository<Appointment> _appointmentsRepository;
        private readonly UserManager<User> _userManager;

        public AppointmentsController(IMapper mapper, UserManager<User> userManager,
                                      IEntityRepository<Appointment> appointmentsRepository)
        {
            _mapper                 = mapper;
            _appointmentsRepository = appointmentsRepository;
            _userManager            = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResult<AppointmentViewModel>>> Get([FromQuery] PaginationFilter filter)
        {
            var email = HttpContext.User.FindFirst(ClaimTypes.Email);

            var user = await _userManager.FindByEmailAsync(email.Value);
            var userRoles = await _userManager.GetRolesAsync(user);

            var showAllAppointments = false;
            string doctorId = null;

            if (SecurityConfig.HasPermission(userRoles, SecurityConfig.MANAGER_ROLE))
                showAllAppointments = true;

            if (SecurityConfig.HasPermission(userRoles, SecurityConfig.DOCTOR_ROLE))
                doctorId = user.Id;
            else if (string.IsNullOrEmpty(doctorId))
                return new PaginationResult<AppointmentViewModel>(new List<AppointmentViewModel>(), 0);

            var paginatedValues =
                await _appointmentsRepository
                      .Mapper<Appointment, AppointmentViewModel>(_mapper)
                      .FindAllPaginated(
                          filter,
                          (x) => showAllAppointments || x.DoctorId == doctorId,
                          includeProperties: new List<Expression<Func<Appointment, object>>>()
                          {
                              x => x.Doctor,
                          }, 
                          defaultOrder: nameof(Appointment.Date));

            var userViewModel = _mapper.Map<UserViewModel>(user);

            foreach (var item in paginatedValues.Items)
                item.User = userViewModel;

            return paginatedValues;
        }

        // TODO: Everything
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpPost]
        public async Task<ActionResult<Appointment>> Post([FromBody] NewAppointmentDTO appointmentDto)
        {
            var appointment = _mapper.Map<Appointment>(appointmentDto);
            var result = await _appointmentsRepository.Add(appointment);
            return Ok(result);
        }

        // TODO: Everything
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{ }

        // TODO: Everything
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{ }
    }
}