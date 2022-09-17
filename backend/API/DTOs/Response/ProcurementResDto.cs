﻿namespace API.DTOs.Response
{
    public class ProcurementResDto
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Category { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime Deadline { get; set; }

        public float EstimatedTotalPrice { get; set; }

        public List<ProcurementProductResDto> Products { get; set; }

        public List<QuotationResDto> Quotations { get; set; }
    }
}
