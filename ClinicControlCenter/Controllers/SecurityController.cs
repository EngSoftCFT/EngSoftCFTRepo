using Microsoft.AspNetCore.Mvc;
using ClinicControlCenter.Security;
using Microsoft.AspNetCore.Authorization;

namespace ClinicControlCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : Controller
    {
        [Authorize(Policy = SecurityConfig.ADMIN_ROLE)]
        [HttpGet("IsAdmin")]
        public ActionResult<bool> IsAdmin()
        {
            return Ok(true);
        }

        [Authorize(Policy = SecurityConfig.DOCTOR_ROLE)]
        [HttpGet("IsDoctor")]
        public ActionResult<bool> IsDoctor()
        {
            return Ok(true);
        }

        [Authorize(Policy = SecurityConfig.USER_ROLE)]
        [HttpGet("IsUser")]
        public ActionResult<bool> IsUser()
        {
            return Ok(true);
        }
    }
}