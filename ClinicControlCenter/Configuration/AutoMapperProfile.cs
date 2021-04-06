using AutoMapper;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Domain.ViewModels;

namespace ClinicControlCenter.Configuration
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, UserViewModel>();
        }
    }
}