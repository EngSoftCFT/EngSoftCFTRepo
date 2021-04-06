using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace SDK.Utils
{
    public static class QueryableExtensions
    {
        // TODO Refatorar o código e adicionar testes
        public static IQueryable<TModel> OrderBy<TModel>(this IQueryable<TModel> q, string name)
        {
            var entityType = typeof(TModel);

            if (name.Contains(',') || name.Contains("asc") || name.Contains("desc"))
            {
                return Order(q, name);
            }

            if (name.Contains('.'))
            {
                if (name.Count(n => n == '.') > 2) // TODO melhorar funcionalidade para N propriedades aninhadas
                {
                    throw new NotImplementedException();
                }

                var navPropertyName = name.Split('.')[0];
                name = name.Split('.')[1];
                var navP = entityType.GetProperty(navPropertyName);
                var newP = navP?.PropertyType.GetProperty(name);
                var m = typeof(QueryableExtensions)
                    .GetMethod(nameof(OrderByNavigationProperty))
                    ?
                    .MakeGenericMethod(entityType, navP?.PropertyType, newP?.PropertyType);

                return (IQueryable<TModel>)m?.Invoke(null, new object[] { q, navP, newP });
            }
            else
            {
                var p = entityType.GetProperty(name.Trim());
                var m = typeof(QueryableExtensions)
                    .GetMethod(nameof(OrderByProperty))
                    ?
                    .MakeGenericMethod(entityType, p?.PropertyType);

                return (IQueryable<TModel>)m?.Invoke(null, new object[] { q, p });
            }
        }

        public static IQueryable<TModel> OrderByDescending<TModel>(this IQueryable<TModel> q, string name)
        {
            var entityType = typeof(TModel);

            if (name.Contains(',') || name.Contains("asc") || name.Contains("desc"))
            {
                return Order(q, name, false);
            }

            if (name.Contains('.')) // TODO melhorar funcionalidade para N propriedades aninhadas
            {
                if (name.Count(n => n == '.') > 2)
                {
                    throw new NotImplementedException();
                }

                var navPropertyName = name.Split('.')[0];
                name = name.Split('.')[1];
                var navP = entityType.GetProperty(navPropertyName);
                var newP = navP?.PropertyType.GetProperty(name);
                var m = typeof(QueryableExtensions)
                    .GetMethod(nameof(OrderByNavigationPropertyDescending))
                    ?
                    .MakeGenericMethod(entityType, navP?.PropertyType, newP?.PropertyType);

                return (IQueryable<TModel>)m?.Invoke(null, new object[] { q, navP, newP });
            }
            else
            {
                var p = entityType.GetProperty(name.Trim());
                var m = typeof(QueryableExtensions)
                    .GetMethod(nameof(OrderByPropertyDescending))
                    ?
                    .MakeGenericMethod(entityType, p?.PropertyType);

                return (IQueryable<TModel>)m?.Invoke(null, new object[] { q, p });
            }
        }

        /// <summary>
        ///     TODO: Melhorar funcionalidade para aceitar propriedades aninhadas.
        ///     Orders the query
        ///     <param name="q" />
        ///     with all properties in
        ///     <param name="name" />
        ///     separated with commas (,). All properties may include an optional 'desc' or 'asc' after
        ///     the property and separated by a single space or the default order
        ///     <param name="ascOrder" />
        ///     is applied.
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <param name="q"></param>
        /// <param name="name"></param>
        /// <param name="ascOrder"></param>
        /// <returns>IOrderedQueryable that can be ordered again with 'ThenBy(Descending)'</returns>
        private static IOrderedQueryable<TModel> Order<TModel>(this IQueryable<TModel> q, string name,
            bool ascOrder = true)
        {
            var entityType = typeof(TModel);

            var props = name.Split(",").Select(x => x.Trim()).ToList();

            var propSplit = props[0].Split(" ");

            var order = ascOrder;
            if (propSplit.Length > 1)
            {
                order = !string.Equals(propSplit[1], "desc", StringComparison.InvariantCultureIgnoreCase);
            }

            var p = entityType.GetProperty(propSplit[0].Trim());
            var m = typeof(QueryableExtensions)
                .GetMethod(order ? nameof(OrderByProperty) : nameof(OrderByPropertyDescending))
                ?
                .MakeGenericMethod(entityType, p?.PropertyType);

            q = (IOrderedQueryable<TModel>)m?.Invoke(null, new object[] { q, p });

            props.RemoveAt(0);
            foreach (var prop in props)
            {
                propSplit = prop.Split(" ");

                order = ascOrder;
                if (propSplit.Length > 1)
                {
                    order = !string.Equals(propSplit[1], "desc", StringComparison.InvariantCultureIgnoreCase);
                }

                p = entityType.GetProperty(propSplit[0].Trim());
                m = typeof(QueryableExtensions)
                    .GetMethod(order ? nameof(OrderThenBy) : nameof(OrderThenByDescending))
                    ?
                    .MakeGenericMethod(entityType, p?.PropertyType);

                q = (IOrderedQueryable<TModel>)m?.Invoke(null, new object[] { q, p });
            }

            return (IOrderedQueryable<TModel>)q;
        }

        public static IOrderedQueryable<TModel> OrderByPropertyDescending<TModel, TRet>(IQueryable<TModel> q,
            PropertyInfo p)
        {
            var pe = Expression.Parameter(typeof(TModel));
            Expression se = Expression.Convert(Expression.Property(pe, p), typeof(TRet));
            return q.OrderByDescending(Expression.Lambda<Func<TModel, TRet>>(se, pe));
        }

        public static IOrderedQueryable<TModel> OrderByNavigationPropertyDescending<TModel, TRet, TRet2>(
            IQueryable<TModel> q, PropertyInfo p1, PropertyInfo p2)
        {
            var pe = Expression.Parameter(typeof(TModel));
            var pe2 = Expression.Property(pe, p1);
            Expression se = Expression.Convert(Expression.Property(pe2, p2), typeof(TRet2));
            return q.OrderByDescending(Expression.Lambda<Func<TModel, TRet2>>(se, pe));
        }

        public static IOrderedQueryable<TModel> OrderByProperty<TModel, TRet>(IQueryable<TModel> q, PropertyInfo p)
        {
            var pe = Expression.Parameter(typeof(TModel));
            Expression se = Expression.Convert(Expression.Property(pe, p), typeof(TRet));
            return q.OrderBy(Expression.Lambda<Func<TModel, TRet>>(se, pe));
        }

        public static IOrderedQueryable<TModel> OrderByNavigationProperty<TModel, TRet, TRet2>(IQueryable<TModel> q,
            PropertyInfo p1, PropertyInfo p2)
        {
            var pe = Expression.Parameter(typeof(TModel));
            var pe2 = Expression.Property(pe, p1);
            Expression se = Expression.Convert(Expression.Property(pe2, p2), typeof(TRet2));
            return q.OrderBy(Expression.Lambda<Func<TModel, TRet2>>(se, pe));
        }

        public static IOrderedQueryable<TModel> OrderThenBy<TModel, TRet>(IOrderedQueryable<TModel> q, PropertyInfo p)
        {
            var pe = Expression.Parameter(typeof(TModel));
            Expression se = Expression.Convert(Expression.Property(pe, p), typeof(TRet));

            return q.ThenBy(Expression.Lambda<Func<TModel, TRet>>(se, pe));
        }

        public static IOrderedQueryable<TModel> OrderThenByDescending<TModel, TRet>(IOrderedQueryable<TModel> q,
            PropertyInfo p)
        {
            var pe = Expression.Parameter(typeof(TModel));
            Expression se = Expression.Convert(Expression.Property(pe, p), typeof(TRet));

            return q.ThenByDescending(Expression.Lambda<Func<TModel, TRet>>(se, pe));
        }

        public static IQueryable<TModel> LongSkip<TModel>(this IQueryable<TModel> query, long qtd)
        {
            while (qtd > int.MaxValue)
            {
                query = query.Skip(int.MaxValue);
                qtd -= int.MaxValue;
            }

            return query.Skip(Convert.ToInt32(qtd));
        }

        public static IQueryable<TModel> Where<TModel, TMiddle>(this IQueryable<TModel> query,
            Expression<Func<TModel, TMiddle>> searchObject,
            Expression<Func<TMiddle, bool>> predicate)
        {
            return query.Where(ExpressionConverter.Convert(predicate, searchObject));
        }
    }
}
