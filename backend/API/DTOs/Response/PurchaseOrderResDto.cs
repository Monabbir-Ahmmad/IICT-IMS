using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Response
{
    public class PurchaseOrderResDto
    {
        public int Id { get; set; }

        public ProcurementResDto Procurement { get; set; }

        public QuotationResDto Quotation { get; set; }
    }
}
