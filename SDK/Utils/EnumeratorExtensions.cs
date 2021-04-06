using System;
using System.Collections.Generic;

namespace SDK.Utils
{
    public static class EnumeratorExtensions
    {
        public static bool MoveNextWhile<T>(this IEnumerator<T> source, Func<T, bool> predicate)
        {
            while (source.MoveNext())
            {
                if (predicate(source.Current))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
