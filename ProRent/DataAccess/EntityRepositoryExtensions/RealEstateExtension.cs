using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProRent.Domain.Filters;
using ProRent.Domain.Models;
using SDK.EntityRepository;
using SDK.EntityRepository.Implementations;

namespace ProRent.DataAccess.EntityRepositoryExtensions
{
    public static class RealEstateExtension
    {
        public static async Task<IEnumerable<RealEstate>> Filter(this IEntityRepositoryLong<RealEstate> repository,
            RealEstateFilter filter)
        {
            var context = repository.GetContext().Set<RealEstate>();
            var query = context.AsQueryable();

            if (filter.Type.HasValue)
                query = query.Where(x => x.Type == filter.Type);

            if (!string.IsNullOrWhiteSpace(filter.Name))
                query = query.Where(x => x.Name.ToLower().Contains(filter.Name.ToLower()));

            if (!string.IsNullOrWhiteSpace(filter.Address))
                query = query.Where(x => (x.Street + x.Neighborhood).ToLower().Contains(filter.Address.ToLower()));

            if (filter.maxRent.HasValue) 
                query = query.Where(x => x.RentValue <= filter.maxRent.Value);

            if (filter.minRent.HasValue)
                query = query.Where(x => x.RentValue >= filter.minRent.Value);

            if (filter.MaxArea.HasValue)
                query = query.Where(x => x.Area <= filter.MaxArea.Value);

            if (filter.MinArea.HasValue)
                query = query.Where(x => x.Area >= filter.MinArea.Value);

            return await query.ToListAsync();
        }
    }
}
