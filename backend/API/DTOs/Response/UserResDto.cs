namespace API.DTOs.Response
{
    public class UserResDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public string ContactNumber { get; set; }

        public string Designation { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
