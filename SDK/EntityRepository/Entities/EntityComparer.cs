using System;
using System.Collections.Generic;

namespace SDK.EntityRepository.Entities
{
    public class EntityComparer : IEqualityComparer<Entity>
    {
        public bool Equals(Entity x, Entity y)
        {
            if (x == null && y == null)
                return true;

            if (x == null || y == null)
                return false;

            return x?.Id == y?.Id;
        }

        public int GetHashCode(Entity obj) => HashCode.Combine(obj.Id);
        
    }
}