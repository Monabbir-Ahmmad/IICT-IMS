using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Response
{
    public class QuotationResDto
    {
        public int Id { get; set; }
        public int ProcurementId { get; set; }
        public string ProcurementName { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public float QuotedTotalPrice { get; set; }
    }
}
