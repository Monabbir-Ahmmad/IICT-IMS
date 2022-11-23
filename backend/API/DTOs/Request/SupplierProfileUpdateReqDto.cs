namespace API.DTOs.Request
{
    public class SupplierProfileUpdateReqDto
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string ContactNumber { get; set; }

        public string Address { get; set; }

        public string Website { get; set; }
    }
}
