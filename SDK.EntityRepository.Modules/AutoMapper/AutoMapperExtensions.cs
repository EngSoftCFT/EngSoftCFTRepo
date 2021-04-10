using AutoMapper;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository.Modules.AutoMapper
{
    public static class AutoMapperExtensions
    {
        public static AutoMapperModule<TEntity, TResult> Mapper<TEntity, TResult>(
            this IEntityRepository<TEntity> repository, IMapper mapper)
            where TEntity : IEntityBase
        {
            return new AutoMapperModule<TEntity, TResult>(repository, mapper);
        }
    }
}