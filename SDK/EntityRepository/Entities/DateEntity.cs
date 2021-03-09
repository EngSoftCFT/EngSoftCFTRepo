using System;

namespace SDK.EntityRepository.Entities
{
    public class DateEntity : Entity
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
