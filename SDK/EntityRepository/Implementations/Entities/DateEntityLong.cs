using System;

namespace SDK.EntityRepository.Implementations.Entities
{
    public class DateEntityLong : EntityLong
    {
        private DateTimeOffset _createdDate;
        private DateTimeOffset _modifiedDate;

        public DateTimeOffset CreatedDate
        {
            get => _createdDate;
            set => _createdDate = value.ToUniversalTime();
        }

        public DateTimeOffset ModifiedDate
        {
            get => _modifiedDate;
            set => _modifiedDate = value.ToUniversalTime();
        }
    }
}
