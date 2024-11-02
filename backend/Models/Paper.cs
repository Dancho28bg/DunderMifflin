using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Paper
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot be longer than 100 characters.")]
        public string Title { get; set; }

        public bool IsDiscontinued { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Stock quantity must be zero or greater.")]
        public int StockQuantity { get; set; }

        // Initialize collections to avoid null references
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
        public ICollection<PaperProperty> PaperProperties { get; set; } = new List<PaperProperty>();

        public Paper() { }
    }
}
