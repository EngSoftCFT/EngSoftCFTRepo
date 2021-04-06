using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ClinicControlCenter.Domain.Filters;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Domain.ViewModels;
using Microsoft.AspNetCore.Identity;
using SDK.EntityRepository;
using SDK.Pagination;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicControlCenter.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserManagementController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        // GET: api/<UserManagementController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> Get(UserFilter filter)
        {
            var query = _userManager.Users;
            var viewQuery = query.ProjectTo<UserViewModel>(_mapper.ConfigurationProvider);
            var paginatedValues = await PaginationHelper<UserViewModel>.PaginateResult(viewQuery, filter);
            return Ok(paginatedValues);
        }

        // GET api/<UserManagementController>/5
        [HttpGet("{id}")]
        public string Get(int id) {
            return "value";
        }

        // POST api/<UserManagementController>
        [HttpPost]
        public void Post([FromBody] string value) {
        }

        // PUT api/<UserManagementController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value) {
        }

        // DELETE api/<UserManagementController>/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
