using AutoMapper;
using ClinicControlCenter.Domain.DTOs;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Domain.ViewModels;

namespace ClinicControlCenter.Configuration
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserViewModel>();
            CreateMap<UserRoleDTO, Patient>();
            CreateMap<UserRoleDTO, Employee>();
            CreateMap<UserRoleDTO, Doctor>();
        }
    }
}