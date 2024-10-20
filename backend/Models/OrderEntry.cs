using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class OrderEntry
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int PaperId { get; set; }
        public int Quantity { get; set; }

        public Order Order { get; set; }
        public Paper Paper { get; set; }

        public OrderEntry() { }
    }
}