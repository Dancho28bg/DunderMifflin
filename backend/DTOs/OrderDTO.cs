using System.Collections.Generic;

namespace DTOs 
{
    public class OrderDto
    {
        public int CustomerId { get; set; }
        public List<OrderEntryDto> OrderEntries { get; set; }
    }

    public class OrderEntryDto
    {
        public int PaperId { get; set; }
        public int Quantity { get; set; }
    }
}