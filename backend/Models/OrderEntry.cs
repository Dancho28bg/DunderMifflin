using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class OrderEntry
    {
        public int Id { get; set; }
        
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Paper ID is required.")]
        public int PaperId { get; set; }

        [Required(ErrorMessage = "Quantity is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than zero.")]
        public int Quantity { get; set; }

        public Order Order { get; set; }
        public Paper Paper { get; set; }

        public OrderEntry() { }
    }
}