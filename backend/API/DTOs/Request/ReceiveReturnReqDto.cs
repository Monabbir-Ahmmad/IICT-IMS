using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ReceiveReturnReqDto
    {
        public int ReceiverId { get; set; }

        [Required]
        public int ReceivedFromId { get; set; }

        [Required]
        public DateTime ReceivingDate { get; set; }
        public List<ReceiveReturnProductReqDto> Products { get; set; }
    }

    public class ReceiveReturnProductReqDto
    {
        [Required]
        public int Id { get; set; }
    }
}
