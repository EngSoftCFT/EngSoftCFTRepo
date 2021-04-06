using System;
using System.Linq;
using System.Text.Json;

namespace SDK.Utils
{
    public static class ObjectExtensions
    {
        public static T ShallowCopy<T>(this T obj, T resultObj = null)
            where T : class
        {
            return ShallowCopy(obj, resultObj, true);
        }

        public static T ShallowCopy<T>(this object obj, T resultObj = null, bool fullCopy = true)
            where T : class
        {
            if (obj == null)
            {
                return resultObj;
            }

            var valueType = obj.GetType();
            var copyType = typeof(T);

            if (!copyType.IsAssignableFrom(valueType))
            {
                return resultObj;
            }

            var properties = fullCopy
                ? valueType.GetProperties().Where(x => x.CanRead && x.CanWrite)
                : copyType.GetProperties().Where(x => x.CanRead && x.CanWrite);

            resultObj ??= (T)Activator.CreateInstance(valueType);

            foreach (var prop in properties)
            {
                prop.SetValue(resultObj, prop.GetValue(obj));
            }

            return resultObj;
        }

        public static T JsonCopy<T>(this T value, JsonSerializerOptions jsonOptions = null)
        {
            var valueType = value.GetType();

            var valueAsString = JsonSerializer.Serialize(value, valueType, jsonOptions);

            return (T)JsonSerializer.Deserialize(valueAsString, valueType, jsonOptions);
        }
    }
}
