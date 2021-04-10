using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public interface IEntityRepositoryWrite<T>
        where T : IEntityBase
    {
        Task<T> Add(T entity);
        Task AddRange(IEnumerable<T> entities);
        Task<T> Update(T entity);
        Task<T> AddOrUpdate(T entity);
        Task Remove(T entity);
        Task Remove(IConvertible id);
    }
}