using System;

namespace SDK.EntityRepository.Entities
{
    public class Entity : IEquatable<Entity>
    {
        public virtual long Id { get; set; }

        public bool Equals(Entity other)
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

            return Equals(obj as Entity);
        }

        public override int GetHashCode() => HashCode.Combine(Id);
    }
}
