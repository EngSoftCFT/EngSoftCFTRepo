using System;

namespace SDK.EntityRepository.Entities
{
    public interface IEntityBase<T> : IEntityBase
        where T : IConvertible
    {
        public new T Id { get; set; }
    }

    public interface IEntityBase
    {
        public IConvertible Id { get; set; }
    }
}