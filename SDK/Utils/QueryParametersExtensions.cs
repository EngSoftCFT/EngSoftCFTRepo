using System.Collections.Generic;
using System.Globalization;

namespace SDK.Utils
{
    public static class QueryParametersExtensions
    {
        public static bool MatchKey(this KeyValuePair<string, string> param, string key)
        {
            return string.Compare(param.Key, key, true, CultureInfo.InvariantCulture) == 0;
        }
    }
}
