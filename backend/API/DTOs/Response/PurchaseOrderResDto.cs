using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Response
{
    public class PurchaseOrderResDto
    {
        public int Id { get; set; }

        public string Category { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime DeliveryDeadline { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string Status { get; set; }

        public List<PurchaseOrderProductResDto> Products { get; set; }

        public ProcurementResDto Procurement { get; set; }

        public QuotationResDto Quotation { get; set; }
    }
}
