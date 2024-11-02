using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "Order entries are required.")]
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();

        public Customer Customer { get; set; }

        [Required]
        [RegularExpression("^(received|sent|delivered)$", ErrorMessage = "Status must be 'received', 'sent', or 'delivered'.")]
        public string Status { get; set; } = "received";

        public Order() { }
    }
}