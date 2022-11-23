namespace API.DTOs.Response
{
    public class SupplierResDto
    {
        public int Id { get; set; }

        public string CompanyName { get; set; }

        public string Email { get; set; }

        public string BIN { get; set; }

        public string Category { get; set; }

        public string Address { get; set; }

        public string ContactNumber { get; set; }

        public string Website { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
