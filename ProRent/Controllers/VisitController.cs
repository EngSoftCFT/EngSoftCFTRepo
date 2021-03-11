using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using ProRent.Domain.DTO;
using ProRent.Domain.Models;
using ProRent.Domain.ViewModels;
using SDK.EntityRepository;

namespace ProRent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitController : ControllerBase
    {
        private readonly EntityRepository<Visit> _visitRepository;
        private readonly EntityRepository<RealEstate> _realEstateRepository;

        public VisitController(EntityRepository<Visit> visitRepository, EntityRepository<RealEstate> realEstateRepository)
        {
            _visitRepository = visitRepository;
            _realEstateRepository = realEstateRepository;
        }


        [HttpGet]
        public async Task<ActionResult<VisitViewModel>> Get()
        {
            var visit = await _visitRepository.FindAllIncluding(x => x.RealEstate);
            var visitViewModel = visit.Select(x => new VisitViewModel()
            {
                Id = x.Id,
                Type = x.RealEstate.Type,
                Name = x.RealEstate.Name,
                Number = x.RealEstate.Number,
                Street = x.RealEstate.Street,
                Neighborhood = x.RealEstate.Neighborhood,
                Area = x.RealEstate.Area,
                RentValue = x.RealEstate.RentValue,
                VisitTime = x.VisitTime
            });

            return Ok(visitViewModel);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Visit>> Get([FromRoute] int id)
        {
            if (await _visitRepository.Find(id) == null)
                return BadRequest("A visit with this id not found.");
            var visit = await _visitRepository.FindIncluding(id, x => x.RealEstate);

            return Ok(visit);
        }

        [HttpPost]
        public async Task<ActionResult<Visit>> Post([FromBody] VisitPostDTO dto)
        {
            if (!dto.RealEstateId.HasValue)
                return BadRequest("Property " + nameof(VisitPostDTO.RealEstateId) + " Needed.");

            if (await _realEstateRepository.Find(dto.RealEstateId.Value) == null)
                return BadRequest("RealEstate with this Id not found.");

            if (!dto.VisitTime.HasValue)
                return BadRequest("Property " + nameof(VisitPostDTO.VisitTime) + " Needed.");

            var visit = await _visitRepository.Add(new Visit()
            {
                RealEstateId = dto.RealEstateId.Value,
                VisitTime = dto.VisitTime.Value
            });

            return Ok(visit);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Visit>> Put([FromRoute] int id, [FromBody] VisitPostDTO dto)
        {
            if (!dto.RealEstateId.HasValue)
                return BadRequest("Property " + nameof(VisitPostDTO.RealEstateId) + " Needed.");

            var realEstate = await _realEstateRepository.Find(dto.RealEstateId.Value);

            if (realEstate == null)
                return BadRequest("RealEstate with this Id not found.");

            if (!dto.VisitTime.HasValue)
                return BadRequest("Property " + nameof(VisitPostDTO.VisitTime) + " Needed.");

            if (await _visitRepository.Find(id) == null)
                return BadRequest("A visit with this id not found.");

            var visit = await _visitRepository.Update(new Visit()
            {
                Id = id,
                RealEstate = realEstate,
                RealEstateId = dto.RealEstateId.Value,
                VisitTime = dto.VisitTime.Value
            });

            return Ok(visit);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            if (await _visitRepository.Find(id) == null)
                return BadRequest("A visit with this id not found.");
            await _visitRepository.Remove(id);
            return Ok();
        }

    }
}
