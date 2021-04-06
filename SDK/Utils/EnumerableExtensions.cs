using System;
using System.Collections.Generic;
using System.Linq;

namespace SDK.Utils
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector)
        {
            var keys = new HashSet<TKey>();
            foreach (var element in source)
            {
                if (keys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }

        public static bool ContainsAll<TSource>(this IEnumerable<TSource> source,
            IEnumerable<TSource> other)
        {
            return other.All(source.Contains);
        }

        public static bool ContainsAny<TSource>(this IEnumerable<TSource> source,
            IEnumerable<TSource> other)
        {
            return source.Any(other.Contains);
        }

        public static Stack<T> ToStack<T>(this IEnumerable<T> source)
        {
            return new Stack<T>(source);
        }

        public static List<T> AsList<T>(this IEnumerable<T> source)
        {
            return source == null || source is List<T> ? (List<T>)source : source.ToList();
        }

        public static IList<T> AsIList<T>(this IEnumerable<T> source)
        {
            return source == null || source is IList<T> ? (IList<T>)source : source.ToList();
        }

        public static T[] AsArray<T>(this IEnumerable<T> source)
        {
            return source == null || source is T[] ? (T[])source : source.ToArray();
        }

        public static bool HasValues<T>(this IEnumerable<T> source)
        {
            try
            {
                return source != null && source.Any();
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static double WeightedAverage<T>(this IEnumerable<T> records, Func<T, double> getValue,
            Func<T, int, double> getWeight, bool ignoreNaN = true)
        {
            double weightSum = 0;
            double weightedValueSum = 0;
            var i = -1;
            foreach (var value in records)
            {
                i++;
                if (double.IsNaN(getValue(value)) && ignoreNaN)
                {
                    continue;
                }

                weightSum += getWeight(value, i);
                weightedValueSum += getWeight(value, i) * getValue(value);
            }


            return Math.Abs(weightSum) > 0.000001
                ? weightedValueSum / weightSum
                : double.NaN;
        }
    }
}
