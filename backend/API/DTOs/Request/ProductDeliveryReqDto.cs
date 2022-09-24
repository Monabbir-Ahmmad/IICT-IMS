using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Request
{
    public class ProductDeliveryReqDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        public float UnitPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime WarrantyExpiryDate { get; set; }
    }
}
