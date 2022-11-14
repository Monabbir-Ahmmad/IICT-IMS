namespace API.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }

        public Category Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }
    }
}
