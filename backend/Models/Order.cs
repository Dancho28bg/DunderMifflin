using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
        public Customer Customer { get; set; } 
        
        public string Status { get; set; } = "received"; 
        
        public Order() { }
    }
}