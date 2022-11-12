

namespace API.DTOs.Request
{
    public class ReceiveReturnReqDto
    {
        public int ReceiverId { get; set; }
        public int ReceivedFromId { get; set; }
        public DateTime ReceivingDate { get; set; }
        public List<ReceiveReturnProductReqDto> Products { get; set; }
        
    }

    public class ReceiveReturnProductReqDto
    {
        public int Id { get; set; }
    }
}