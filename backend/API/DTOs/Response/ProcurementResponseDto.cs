using API.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Response
{
    public class ProcurementResponseDto
    {
        public string Name { get; set; }

        public string Category { get; set; }

        public float EstimatedTotalPrice { get; set; }

        public DateTime IssuingDate { get; set; }

        public DateTime TenderDeadline { get; set; }

        public List<ProcurementProduct> Items { get; set; }
    }
}
