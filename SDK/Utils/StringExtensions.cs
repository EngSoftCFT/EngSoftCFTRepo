using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SDK.Utils
{
    public static class StringExtensions
    {
        public static string SplitCamelCase(this string input)
        {
            return Regex.Replace(input, "([a-z])([A-Z])", "$1 $2", RegexOptions.Compiled).Trim();
        }

        public static List<int> AllIndexesOf(this string str, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException("The string to find may not be empty", nameof(value));
            }

            var indexes = new List<int>();
            for (var index = 0;; index += value.Length)
            {
                index = str.IndexOf(value, index, StringComparison.Ordinal);
                if (index == -1)
                {
                    return indexes;
                }

                indexes.Add(index);
            }
        }
    }
}
