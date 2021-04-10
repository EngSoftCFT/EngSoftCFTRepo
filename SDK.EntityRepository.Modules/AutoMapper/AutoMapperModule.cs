using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository.Modules.AutoMapper
{
    public class AutoMapperModule<TEntity, TResult>
        where TEntity : IEntityBase
    {
        private readonly IEntityRepository<TEntity> _repository;
        private readonly IMapper _mapper;

        public AutoMapperModule(IEntityRepository<TEntity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper     = mapper;
        }

        public IQueryable<TResult> RunPipeline(IEnumerable<Expression<Func<TEntity, object>>> includeProperties = null,
                                               Expression<Func<TEntity, bool>> predicate = null)
        {
            return _repository.RunPipeline(includeProperties, predicate)
                              .ProjectTo<TResult>(_mapper.ConfigurationProvider);
        }

        public Task<TResult> Find(Expression<Func<TEntity, bool>> predicate,
                                  params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return RunPipeline(includeProperties, predicate).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<TResult>> FindAll(
            Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return await RunPipeline(includeProperties, predicate)
                       .ToListAsync();
        }
    }
}