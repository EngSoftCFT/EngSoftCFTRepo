using System;

namespace SDK.Utils
{
    public static class DateTimeExtensions
    {
        public static DateTime Trim(this DateTime date, long roundTicks = TimeSpan.TicksPerMillisecond)
        {
            return new DateTime(date.Ticks - date.Ticks % roundTicks, date.Kind);
        }

        public static DateTimeOffset Trim(this DateTimeOffset date, long roundTicks = TimeSpan.TicksPerMillisecond)
        {
            return new DateTimeOffset(date.UtcDateTime.Trim(roundTicks));
        }
    }
}
