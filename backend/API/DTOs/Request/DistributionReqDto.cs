using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class DistributionReqDto
    {
        [Required]
        public int DistributorId { get; set; }

        [Required]
        public int DistributedToId { get; set; }

        [Required]
        public DateTime DistributionDate { get; set; }
        public string DistributionRoom { get; set; }
        public List<DistributionProductReqDto> Products { get; set; }
    }

    public class DistributionProductReqDto
    {
        [Required]
        public int Id { get; set; }
    }
}
