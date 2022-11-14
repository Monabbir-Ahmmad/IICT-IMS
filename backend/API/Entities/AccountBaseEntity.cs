namespace API.Entities
{
    public abstract class AccountBaseEntity : BaseEntity
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public bool IsVerified { get; set; }
    }
}
