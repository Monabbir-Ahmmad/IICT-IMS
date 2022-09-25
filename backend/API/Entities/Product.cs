using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ProductCategory Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }

        public decimal UnitPrice { get; set; }

        public DateTime WarrantyExpiryDate { get; set; }

        public string Status { get; set; }

        public PurchaseOrder PurchaseOrder { get; set; }
    }
}
