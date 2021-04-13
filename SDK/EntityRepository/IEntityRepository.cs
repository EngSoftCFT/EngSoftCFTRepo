using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public interface IEntityRepository<T> : IEntityRepositoryReadOnly<T>, IEntityRepositoryReadResultSet<T>,
                                            IEntityRepositoryWrite<T>, IEntityRepositoryInternal<T>
        where T : IEntityBase
    { }
}