using System.Threading.Tasks;
using AutoMapper;
using ClinicControlCenter.Domain.DTOs;
using ClinicControlCenter.Domain.Filters;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;
using SDK.EntityRepository;
using SDK.EntityRepository.Modules.AutoMapper;
using SDK.EntityRepository.Modules.Pagination;
using SDK.Pagination;


namespace ClinicControlCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IEntityRepository<Address> _addressRepository;

        public AddressController(IMapper mapper,
                                 IEntityRepository<Address> addressRepository)
        {
            _mapper            = mapper;
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResult<AddressViewModel>>> Get([FromQuery] AddressFilter filter)
        {
            var paginatedValues =
                await _addressRepository
                      .Mapper<Address, AddressViewModel>(_mapper)
                      .FindAll((x) => string.IsNullOrWhiteSpace(filter.CEP) ||
                                      x.CEP.ToLower().Contains(filter.CEP.ToLower()));

            return Ok(paginatedValues);
        }

        [HttpPost]
        public async Task<ActionResult<Address>> Post([FromBody] AddressDTO addressDTO)
        {
            var address = _mapper.Map<Address>(addressDTO);
            var result = await _addressRepository.Add(address);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete([FromRoute] long id)
        {
            await _addressRepository.Remove(id);
            return Ok();
        }
    }
}