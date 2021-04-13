using System;
using System.Collections.Generic;

namespace SDK.EntityRepository.Entities
{
    public class EntityComparer : IEqualityComparer<IEntityBase<IConvertible>>
    {
#nullable enable
        public bool Equals(IEntityBase<IConvertible>? x, IEntityBase<IConvertible>? y)
        {
            if (x == null && y == null)
                return true;

            if (x == null || y == null)
                return false;

            return x.Id.Equals(y.Id);
        }
#nullable restore

        public int GetHashCode(IEntityBase<IConvertible> obj) => HashCode.Combine(obj.Id);
    }
}