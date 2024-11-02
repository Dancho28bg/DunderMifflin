using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class OrderDto
    {
        [Required(ErrorMessage = "Customer ID is required.")]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "At least one order entry is required.")]
        [MinLength(1, ErrorMessage = "At least one order entry is required.")]
        public List<OrderEntryDto> OrderEntries { get; set; }
    }

    public class OrderEntryDto
    {
        [Required(ErrorMessage = "Paper ID is required.")]
        public int PaperId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than zero.")]
        public int Quantity { get; set; }
    }
}
