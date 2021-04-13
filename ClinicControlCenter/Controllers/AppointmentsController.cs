using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AutoMapper;
using ClinicControlCenter.Domain.Models;
using SDK.EntityRepository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicControlCenter.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly IEntityRepository<Appointment> _appointmentsRepository;

        public AppointmentsController(IMapper mapper, IEntityRepository<Appointment> appointmentsRepository)
        {
            _mapper = mapper;
            _appointmentsRepository = appointmentsRepository;
        }

        [HttpGet]
        public IEnumerable<string> Get() {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string Get(int id) {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody] string value) {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value) {
        }

        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
