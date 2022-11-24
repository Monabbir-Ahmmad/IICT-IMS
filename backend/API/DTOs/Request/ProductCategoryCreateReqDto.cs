using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProductCategoryCreateReqDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
