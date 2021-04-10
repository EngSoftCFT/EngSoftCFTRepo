using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SDK.EntityRepository.Entities
{
    public class EntityBase<T> : IEntityBase<T>
    where T: IConvertible
    {
        public T Id { get; set; }

        [NotMapped, JsonIgnore]
        IConvertible IEntityBase.Id
        {
            get => Id;
            set => Id = (T)value;
        }
    }
}