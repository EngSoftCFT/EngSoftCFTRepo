using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository
{
    public class EntityRepository<T> : IEntityRepository<T>
        where T : class, IEntityBase
    {
        protected readonly DbContext Context;

        public EntityRepository(DbContext context)
        {
            Context = context;
        }

        #region Pipeline

        public virtual DbContext GetContext()
        {
            return Context;
        }

        public virtual IQueryable<T> GetQueryable(IEnumerable<Expression<Func<T, object>>> includeProperties)
        {
            var query = GetContext().Set<T>().AsQueryable();
            if (includeProperties != null)
                query = includeProperties.Aggregate(query,
                    (current, property) => current.Include(property));
            return query;
        }

        public virtual IQueryable<T> FilterQuery(IQueryable<T> query, Expression<Func<T, bool>> predicate = null)
        {
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public virtual IQueryable<TResult> ChangeModel<TResult>(
            IQueryable<T> query, Expression<Func<T, TResult>> selectExpression = null)
        {
            return selectExpression != null
                       ? query.Select(selectExpression)
                       : (IQueryable<TResult>)query;
        }

        public virtual IQueryable<T> RunPipeline(IEnumerable<Expression<Func<T, object>>> includeProperties,
                                                 Expression<Func<T, bool>> predicate = null)
        {
            var query = GetQueryable(includeProperties);
            query = FilterQuery(query, predicate);
            return query;
        }

        public virtual IQueryable<T> RunPipeline(Expression<Func<T, bool>> predicate = null)
        {
            return RunPipeline(null, predicate);
        }

        public virtual IQueryable<TResult> RunPipeline<TResult>(
            Expression<Func<T, TResult>> selectExpression,
            IEnumerable<Expression<Func<T, object>>> includeProperties = null,
            Expression<Func<T, bool>> predicate = null)
        {
            var query = RunPipeline(includeProperties, predicate);
            return ChangeModel(query, selectExpression);
        }

        #endregion


        #region Read Methods

        public Task<T> Find(IConvertible id, params Expression<Func<T, object>>[] includeProperties)
        {
            return RunPipeline(includeProperties).SingleOrDefaultAsync(x => x.Id.Equals(id));
        }

        public Task<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            return RunPipeline(includeProperties, predicate).SingleOrDefaultAsync();
        }

        public Task<bool> Any(Expression<Func<T, bool>> predicate)
        {
            return RunPipeline(predicate).AnyAsync();
        }

        public Task<long> Count(Expression<Func<T, bool>> predicate)
        {
            return RunPipeline(predicate).LongCountAsync();
        }

        public async Task<IEnumerable<T>> FindAll(
            Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            return await RunPipeline(includeProperties, predicate).ToListAsync();
        }

        public async Task<IEnumerable<TResult>> FindAllSelecting<TResult>(
            Expression<Func<T, TResult>> selectExpression, Expression<Func<T, bool>> predicate = null,
            params Expression<Func<T, object>>[] includeProperties)
        {
            return await RunPipeline(selectExpression, includeProperties, predicate).ToListAsync();
        }

        #endregion

        #region Write Methods

        public virtual async Task<T> Add(T entity)
        {
            await GetContext().Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task AddRange(IEnumerable<T> entities)
        {
            await GetContext().Set<T>().AddRangeAsync(entities);
            await Context.SaveChangesAsync();
        }

        public virtual async Task<T> Update(T entity)
        {
            var context = GetContext();
            var existingEntity = await context.Set<T>().FindAsync(entity);
            if (existingEntity == null)
            {
                return null;
            }

            context.Entry(existingEntity).CurrentValues.SetValues(entity);

            await Context.SaveChangesAsync();
            return existingEntity;
        }

        public virtual async Task<T> AddOrUpdate(T entity)
        {
            var context = GetContext();
            var dbSet = context.Set<T>();
            var existingEntity = await dbSet.FindAsync(entity);

            if (existingEntity == null)
            {
                await dbSet.AddAsync(entity);
            }
            else
            {
                context.Entry(existingEntity).CurrentValues.SetValues(entity);
            }

            await context.SaveChangesAsync();

            return entity;
        }


        public virtual Task Remove(T entity)
        {
            GetContext().Set<T>().Remove(entity);
            return Context.SaveChangesAsync();
        }

        public virtual Task Remove(IConvertible id)
        {
            var existingEntity = GetContext().Set<T>().FirstOrDefault(e => e.Id.Equals(id));

            return Remove(existingEntity);
        }

        #endregion
    }
}