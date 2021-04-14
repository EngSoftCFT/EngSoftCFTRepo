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
            CreateMap<UserRoleDTO, Patient>();
            CreateMap<UserRoleDTO, Employee>();
            CreateMap<UserRoleDTO, Doctor>();

            CreateMap<UserDTO, User>();
            CreateMap<User, UserViewModel>()
                .ForMember(x => x.IsDoctor, m => m.MapFrom(x => x.Doctor != null))
                .ForMember(x => x.IsEmployee, m => m.MapFrom(x => x.Employee != null))
                .ForMember(x => x.IsPatient, m => m.MapFrom(x => x.Patient != null));

            CreateMap<Doctor, DoctorViewModel>();
            CreateMap<Employee, EmployeeViewModel>();
            CreateMap<Patient, PatientViewModel>();

            CreateMap<Appointment, AppointmentViewModel>();
            CreateMap<NewAppointmentDTO, Appointment>();

            CreateMap<Address, AddressViewModel>();
            CreateMap<AddressDTO, Address>();
        }
    }
}