using System;
using Microsoft.AspNetCore.Mvc;
using ProRent.Domain.Filters;
using ProRent.Domain.Models;
using ProRent.Domain.ViewModels;
using SDK.EntityRepository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProRent.DataAccess.EntityRepositoryExtensions;
using ProRent.Domain.DTO;
using ProRent.Domain.Enums;
using SDK.EntityRepository.Implementations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RealEstateController : ControllerBase
    {
        private readonly EntityRepositoryLong<RealEstate> _realEstateRepository;

        public RealEstateController(EntityRepositoryLong<RealEstate> realEstateRepository)
        {
            _realEstateRepository = realEstateRepository;
        }

        // GET: api/<RealEstateController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RealEstateViewModel>>> Get([FromQuery] RealEstateFilter filter)
        {
            var realEstates = await _realEstateRepository.Filter(filter);
            var realEstatesViewModel = realEstates.Select(x => new RealEstateViewModel()
            {
                Id = x.Id,
                Area = Convert.ToInt32(x.Area),
                Name = x.Name,
                Address = x.Street + ", " + x.Neighborhood,
                Type = x.Type,
                BedRoomQt = x.BedRoomQt,
                SuiteQt = x.SuiteQt,
                GarageParkingSpace = x.GarageParkingSpace,
                RentValue = x.RentValue
            });

            return Ok(realEstatesViewModel);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RealEstate>> Get([FromRoute] int id)
        {
            if (await _realEstateRepository.Find(id) == null)
                return BadRequest("RealEstate with this id not found.");

            var realEstate = await _realEstateRepository.Find(id);

            return Ok(realEstate);
        }


        // POST api/<RealEstateController>
        [HttpPost]
        public async Task<ActionResult<RealEstate>> Post([FromBody] RealEstatePostDTO dto)
        {
            if (!dto.Area.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.Area) + " Needed.");

            if (!dto.RentValue.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.RentValue) + " Needed.");

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Property " + nameof(RealEstatePostDTO.Name) + " Needed.");

            if (!dto.Type.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.Type) + " Needed.");

            if (!dto.Number.HasValue || string.IsNullOrWhiteSpace(dto.Street) || string.IsNullOrWhiteSpace(dto.Neighborhood) || string.IsNullOrWhiteSpace(dto.City) || string.IsNullOrWhiteSpace(dto.State) || string.IsNullOrWhiteSpace(dto.Country))
                return BadRequest("No Part of address can be null.");

            if(!dto.BedRoomQt.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.BedRoomQt) + " Needed.");

            if (!dto.SuiteQt.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.SuiteQt) + " Needed.");

            if (!dto.LivingRoomQt.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.LivingRoomQt) + " Needed.");

            if (!dto.GarageParkingSpace.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.GarageParkingSpace) + " Needed.");

            if (!dto.Closet.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.Closet) + " Needed.");

            if (dto.Type == RealEstateType.APARTMENT)
            {
                if (!dto.Floor.HasValue)
                    return BadRequest("Property " + nameof(RealEstatePostDTO.Floor) + " Needed.");

                if (!dto.CondominiumFee.HasValue)
                    return BadRequest("Property " + nameof(RealEstatePostDTO.CondominiumFee) + " Needed.");

                if(!dto.Doorman.HasValue)
                    return BadRequest("Property " + nameof(RealEstatePostDTO.CondominiumFee) + " Needed.");
            }

            var realEstate = await _realEstateRepository.Add(new RealEstate()
            {
                Type = dto.Type.Value,
                Name = dto.Name,
                Number = dto.Number.Value,
                Street = dto.Street,
                Neighborhood = dto.Neighborhood,
                City = dto.City,
                State = dto.State,
                Country = dto.Country,
                BedRoomQt = dto.BedRoomQt.Value,
                SuiteQt = dto.SuiteQt.Value,
                LivingRoomQt = dto.LivingRoomQt.Value,
                GarageParkingSpace = dto.GarageParkingSpace.Value,
                Area = dto.Area.Value,
                Closet = dto.Closet.Value,
                Description = dto.Description,
                Floor = dto.Type == RealEstateType.APARTMENT ? dto.Floor: null,
                CondominiumFee = dto.Type == RealEstateType.APARTMENT ? dto.CondominiumFee: null,
                RentValue = dto.RentValue.Value,
                Doorman = dto.Type == RealEstateType.APARTMENT ? dto.Doorman.Value: null
            });

            return Ok(realEstate);
        }

        // PUT api/<RealEstateController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RealEstate>> Put([FromRoute] int id, [FromBody] RealEstatePostDTO dto)
        {
            if (!dto.Area.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.Area) + " Needed.");

            if (!dto.RentValue.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.RentValue) + " Needed.");

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Property " + nameof(RealEstatePostDTO.Name) + " Needed.");

            if (!dto.Type.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.Type) + " Needed.");

            if (!dto.Number.HasValue || string.IsNullOrWhiteSpace(dto.Street) || string.IsNullOrWhiteSpace(dto.Neighborhood) || string.IsNullOrWhiteSpace(dto.City) || string.IsNullOrWhiteSpace(dto.State) || string.IsNullOrWhiteSpace(dto.Country))
                return BadRequest("No Part of address can be null.");

            if (!dto.BedRoomQt.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.BedRoomQt) + " Needed.");

            if (!dto.SuiteQt.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.SuiteQt) + " Needed.");

            if (!dto.LivingRoomQt.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.LivingRoomQt) + " Needed.");

            if (!dto.GarageParkingSpace.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.GarageParkingSpace) + " Needed.");

            if (!dto.Closet.HasValue)
                return BadRequest("Property " + nameof(RealEstatePostDTO.Closet) + " Needed.");

            if (await _realEstateRepository.Find(id) == null)
                return BadRequest("RealEstate with this id not found.");

            if (dto.Type == RealEstateType.APARTMENT)
            {
                if (!dto.Floor.HasValue)
                    return BadRequest("Property " + nameof(RealEstatePostDTO.Floor) + " Needed.");

                if (!dto.CondominiumFee.HasValue)
                    return BadRequest("Property " + nameof(RealEstatePostDTO.CondominiumFee) + " Needed.");

                if (!dto.Doorman.HasValue)
                    return BadRequest("Property " + nameof(RealEstatePostDTO.CondominiumFee) + " Needed.");
            }

            var realEstate = await _realEstateRepository.Update(new RealEstate()
            {
                Id = id,
                Type = dto.Type.Value,
                Name = dto.Name,
                Number = dto.Number.Value,
                Street = dto.Street,
                Neighborhood = dto.Neighborhood,
                City = dto.City,
                State = dto.State,
                Country = dto.Country,
                BedRoomQt = dto.BedRoomQt.Value,
                SuiteQt = dto.SuiteQt.Value,
                LivingRoomQt = dto.LivingRoomQt.Value,
                GarageParkingSpace = dto.GarageParkingSpace.Value,
                Area = dto.Area.Value,
                Closet = dto.Closet.Value,
                Description = dto.Description,
                Floor = dto.Floor,
                CondominiumFee = dto.CondominiumFee,
                RentValue = dto.RentValue.Value,
                Doorman = dto.Doorman.Value
            });

            return Ok(realEstate);
        }

        // DELETE api/<RealEstateController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            if (await _realEstateRepository.Find(id) == null)
                return BadRequest("RealEstate with this id not found.");
            await _realEstateRepository.Remove(id);
            return Ok();
        }
    }
}