using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Response
{
    public class DistributionResDto
    {
        public int Id { get; set; }
        public string DistributorName { get; set; }
        public string DistributedToName { get; set; }
        public DateTime DistributionDate { get; set; }
        public string DistributionRoom { get; set; }
        public List<InventoryProductResDto> Products { get; set; }
    }
}
