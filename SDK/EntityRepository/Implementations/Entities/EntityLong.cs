using System;
using SDK.EntityRepository.Entities;

namespace SDK.EntityRepository.Implementations.Entities
{
    public class EntityLong : EntityBase<long>, IEquatable<EntityLong>
    {
        public bool Equals(EntityLong other)
        {
            if (ReferenceEquals(null, other))
                return false;

            if (ReferenceEquals(this, other))
                return true;

            return GetType() == other.GetType() && Id == other?.Id;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
                return false;

            if (ReferenceEquals(this, obj))
                return true;

            return Equals(obj as EntityLong);
        }

        public override int GetHashCode() => HashCode.Combine(Id);
    }
}