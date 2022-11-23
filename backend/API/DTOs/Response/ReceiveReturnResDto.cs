using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Response
{
    public class ReceiveReturnResDto
    {
        public int Id { get; set; }
        public string ReceiverName { get; set; }
        public string ReceivedFromName { get; set; }
        public DateTime ReceivingDate { get; set; }
        public List<InventoryProductResDto> Products { get; set; }
    }
}
