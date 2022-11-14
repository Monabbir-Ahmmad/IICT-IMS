namespace API.Entities
{
    public class User : AccountBaseEntity
    {
        public string Username { get; set; }

        public UserRole Role { get; set; }

        public string ContactNumber { get; set; }

        public string Designation { get; set; }
    }
}
