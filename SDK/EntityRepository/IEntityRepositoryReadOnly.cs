using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public interface IEntityRepositoryReadOnly<T>
        where T : IEntityBase
    {
        Task<bool> Any(Expression<Func<T, bool>> predicate);
        Task<long> Count(Expression<Func<T, bool>> predicate);
    }
}