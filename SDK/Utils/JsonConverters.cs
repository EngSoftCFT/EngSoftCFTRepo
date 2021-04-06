using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SDK.Utils
{
    public class HandleSpecialDoublesAsStrings : JsonConverter<double>
    {
        public override double Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                return double.Parse(reader.GetString());
            }

            return reader.GetDouble();
        }

        public override void Write(Utf8JsonWriter writer, double value, JsonSerializerOptions options)
        {
            if (double.IsFinite(value))
            {
                writer.WriteNumberValue(value);
            }
            else
            {
                writer.WriteStringValue(value.ToString());
            }
        }
    }

    public class HandleSpecialDoublesAsStrings_NewtonsoftCompat : JsonConverter<double>
    {
        public override double Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                var specialDouble = reader.GetString();
                return specialDouble switch
                {
                    "Infinity" => double.PositiveInfinity,
                    "-Infinity" => double.NegativeInfinity,
                    _ => double.NaN,
                };
            }

            return reader.GetDouble();
        }

        private static readonly JsonEncodedText SNan = JsonEncodedText.Encode("NaN");
        private static readonly JsonEncodedText SInfinity = JsonEncodedText.Encode("Infinity");
        private static readonly JsonEncodedText SNegativeInfinity = JsonEncodedText.Encode("-Infinity");

        public override void Write(Utf8JsonWriter writer, double value, JsonSerializerOptions options)
        {
            if (double.IsFinite(value))
            {
                writer.WriteNumberValue(value);
            }
            else
            {
                if (double.IsPositiveInfinity(value))
                {
                    writer.WriteStringValue(SInfinity);
                }
                else if (double.IsNegativeInfinity(value))
                {
                    writer.WriteStringValue(SNegativeInfinity);
                }
                else
                {
                    writer.WriteStringValue(SNan);
                }
            }
        }
    }
}
