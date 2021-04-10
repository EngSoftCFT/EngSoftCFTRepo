using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Implementations.Entities;

namespace SDK.EntityRepository.Implementations
{
    public class DateEntityRepositoryLong<T> : EntityRepository<T>
        where T : DateEntityLong
    {
        public DateEntityRepositoryLong(DbContext context)
            : base(context)
        { }

        #region Write Methods

        public override async Task<T> Add(T entity)
        {
            SetModifiedDates(entity);
            await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task AddRange(IEnumerable<T> entities)
        {
            SetModifiedDates(entities);
            await Context.Set<T>().AddRangeAsync(entities);
            await Context.SaveChangesAsync();
        }

        public override async Task<T> Update(T entity)
        {
            var existingEntity = Context.Set<T>().FirstOrDefault(e => e.Id == entity.Id);
            if (existingEntity == null)
            {
                return null;
            }

            SetModifiedDates(entity);
            Context.Entry(existingEntity).CurrentValues.SetValues(entity);

            await Context.SaveChangesAsync();
            return existingEntity;
        }

        public override Task Remove(T entity)
        {
            Context.Set<T>().Remove(entity);
            return Context.SaveChangesAsync();
        }

        protected void SetModifiedDates(T entity) => SetModifiedDates(new[] { entity });

        protected void SetModifiedDates(IEnumerable<T> entities)
        {
            var modifiedDate = DateTimeOffset.UtcNow.ToUniversalTime();
            foreach (var entity in entities)
            {
                if (entity.Id <= 0)
                    entity.CreatedDate = modifiedDate;

                entity.ModifiedDate = modifiedDate;
            }
        }

        #endregion
    }
}