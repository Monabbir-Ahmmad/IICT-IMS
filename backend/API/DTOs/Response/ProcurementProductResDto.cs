using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Response
{
    public class ProcurementProductResDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }

        public decimal EstimatedPrice { get; set; }

        public int Quantity { get; set; }

        public decimal EstimatedTotalPrice { get; set; }
    }
}
