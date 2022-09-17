using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ProductCategory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
