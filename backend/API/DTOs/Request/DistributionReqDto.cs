namespace API.DTOs.Request
{
    public class DistributionReqDto
    {
        public int DistributedToId { get; set; }

        public DateTime DistributionDate { get; set; }
        public string DistributionRoom { get; set; }
        public List<DistributionProductReqDto> Products { get; set; }
    }

    public class DistributionProductReqDto
    {
        public int Id { get; set; }
    }
}
