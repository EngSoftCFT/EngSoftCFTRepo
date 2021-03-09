using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public class DateEntityRepository<T, TContext> : IEntityRepository<T>
        where T : DateEntity
        where TContext : DbContext
    {
        protected readonly TContext Context;

        public DateEntityRepository(TContext context)
        {
            Context = context;
        }
        public DbContext GetContext()
        {
            return Context;
        }

        #region Read Methods

        public Task<long> CountAll()
        {
            return Context.Set<T>().LongCountAsync();
        }

        public Task<long> CountWhere(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().LongCountAsync(predicate);
        }

        public Task<bool> Any(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().AnyAsync(predicate);
        }

        public ValueTask<T> Find(long id)
        {
            return Context.Set<T>().FindAsync(id);
        }

        public Task<T> FindIncluding(long id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Context.Set<T>();
            query = includeProperties.Aggregate(query,
                (current, property) => current.Include(property));

            return query.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<T>> FindAll()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> predicate)
        {
            return await Context.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task<IEnumerable<T>> FindAllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Context.Set<T>();
            query = includeProperties.Aggregate(query,
                (current, property) => current.Include(property));

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> FindAllIncluding(Expression<Func<T, bool>> predicate,
                                                           params Expression<Func<T, object>>[] includeProperties)
        {
            var query = Context.Set<T>().Where(predicate);
            query = includeProperties.Aggregate(query,
                (current, property) => current.Include(property));

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<TResult>> FindAllIncludingSelecting<TResult>(Expression<Func<T, bool>> predicate,
                                                                                   Expression<Func<T, TResult>>
                                                                                       selectExpression,
                                                                                   params Expression<Func<T, object>>[]
                                                                                       includeProperties)
        {
            var query = Context.Set<T>().Where(predicate);
            query = includeProperties.Aggregate(query,
                (current, property) => current.Include(property));


            return await query.Select(selectExpression).ToListAsync();
        }

        public Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        #endregion

        #region Write Methods

        public virtual async Task<T> Add(T entity)
        {
            SetModifiedDates(entity);
            await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task AddRange(IEnumerable<T> entities)
        {
            SetModifiedDates(entities);
            await Context.Set<T>().AddRangeAsync(entities);
            await Context.SaveChangesAsync();
        }

        public virtual async Task<T> Update(T entity)
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

        public virtual Task Remove(T entity)
        {
            Context.Set<T>().Remove(entity);
            return Context.SaveChangesAsync();
        }

        public virtual Task Remove(long id)
        {
            var existingEntity = Context.Set<T>().FirstOrDefault(e => e.Id == id);

            return Remove(existingEntity);
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